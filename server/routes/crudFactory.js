const express = require('express');
const auth = require('../middleware/auth');
const { logActivity } = require('../utils/activityLogger');

const FORBIDDEN_FIELDS = ['_id', '__v', 'createdAt', 'updatedAt'];

function sanitizeBody(body) {
  const clean = {};
  for (const key of Object.keys(body)) {
    if (!FORBIDDEN_FIELDS.includes(key)) {
      clean[key] = body[key];
    }
  }
  return clean;
}

function createCrudRoutes(Model, resourceName) {
  const router = express.Router();
  router.use(auth);

  router.get('/', async (req, res) => {
    try {
      const { search, status, available, page = 1, limit = 50, sort = '-createdAt' } = req.query;
      const filter = {};
      if (status) filter.status = status;
      if (typeof available === 'boolean' || available === 'true' || available === 'false') {
        filter.available = available === 'true' || available === true;
      }
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { city: { $regex: search, $options: 'i' } },
          { engine: { $regex: search, $options: 'i' } },
          { type: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      const total = await Model.countDocuments(filter);
      const items = await Model.find(filter).sort(sort).skip((page - 1) * limit).limit(parseInt(limit));
      const activeCount = await Model.countDocuments({ ...filter, status: 'active' });
      const inactiveCount = await Model.countDocuments({ ...filter, status: 'inactive' });
      res.json({ data: items, total, activeCount, inactiveCount, page: parseInt(page), pages: Math.ceil(total / limit) });
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de la recuperation des ${resourceName}.` });
    }
  });

  router.get('/all', async (req, res) => {
    try {
      const items = await Model.find({ available: true }).sort('name');
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: 'Erreur.' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ error: `${resourceName} non trouve(e).` });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: 'Erreur.' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const clean = sanitizeBody(req.body);
      const item = await Model.create(clean);
      await logActivity({
        user: req.user.name,
        userId: req.user._id,
        action: `${resourceName}_created`,
        resource: resourceName,
        resourceId: item._id.toString(),
        details: `${resourceName} "${item.name}" cree(e)`,
        ip: req.ip
      });
      res.status(201).json(item);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ error: 'Donnees invalides: ' + err.message });
      }
      res.status(500).json({ error: `Erreur lors de la creation du ${resourceName}.` });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ error: `${resourceName} non trouve(e).` });
      const oldPrice = item.pricePerDay || item.pricePerNight || item.price;
      const clean = sanitizeBody(req.body);
      Object.assign(item, clean);
      await item.save();
      const newPrice = item.pricePerDay || item.pricePerNight || item.price;
      if (oldPrice && newPrice && oldPrice !== newPrice) {
        await logActivity({
          user: req.user.name,
          userId: req.user._id,
          action: 'price_changed',
          resource: resourceName,
          resourceId: item._id.toString(),
          details: `${item.name}: ${oldPrice} → ${newPrice} MAD`,
          metadata: { oldPrice, newPrice },
          ip: req.ip
        });
      } else {
        await logActivity({
          user: req.user.name,
          userId: req.user._id,
          action: `${resourceName}_updated`,
          resource: resourceName,
          resourceId: item._id.toString(),
          details: `${resourceName} "${item.name}" modifie(e)`,
          ip: req.ip
        });
      }
      res.json(item);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ error: 'Donnees invalides: ' + err.message });
      }
      res.status(500).json({ error: `Erreur lors de la modification du ${resourceName}.` });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ error: `${resourceName} non trouve(e).` });
      await Model.findByIdAndDelete(req.params.id);
      await logActivity({
        user: req.user.name,
        userId: req.user._id,
        action: `${resourceName}_deleted`,
        resource: resourceName,
        resourceId: req.params.id,
        details: `${resourceName} "${item.name}" supprime(e)`,
        ip: req.ip
      });
      res.json({ message: `${resourceName} supprime(e).` });
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de la suppression du ${resourceName}.` });
    }
  });

  return router;
}

function createPublicCrudRoutes(Model, resourceName) {
  const router = express.Router();

  function addIdField(items) {
    if (Array.isArray(items)) {
      return items.map(item => {
        const obj = item.toObject ? item.toObject() : { ...item };
        obj.id = obj._id.toString();
        return obj;
      });
    }
    const obj = items.toObject ? items.toObject() : { ...items };
    obj.id = obj._id.toString();
    return obj;
  }

  router.get('/', async (req, res) => {
    try {
      const { search, category, city, sort = 'name', page = 1, limit = 100 } = req.query;
      const filter = { available: true, status: 'active' };
      if (category) filter.category = category;
      if (city) filter.city = city;
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { city: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      const items = await Model.find(filter).sort(sort).limit(parseInt(limit));
      res.json(addIdField(items));
    } catch (err) {
      res.status(500).json({ error: 'Erreur serveur.' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ error: `${resourceName} non trouve(e).` });
      res.json(addIdField(item));
    } catch (err) {
      res.status(500).json({ error: 'Erreur serveur.' });
    }
  });

  return router;
}

module.exports = createCrudRoutes;
module.exports.createPublicCrudRoutes = createPublicCrudRoutes;
