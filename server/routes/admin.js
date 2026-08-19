const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const AdminUser = require('../models/AdminUser');
const { logActivity } = require('../utils/activityLogger');

router.use(auth);

router.get('/users', authorize('super_admin'), async (req, res) => {
  try {
    const users = await AdminUser.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la recuperation des utilisateurs.' });
  }
});

router.post('/users', authorize('super_admin'), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nom, email et mot de passe requis.' });
    }
    const existing = await AdminUser.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'Cet email est deja utilise.' });
    }
    const user = await AdminUser.create({ name, email: email.toLowerCase(), password, role: role || 'manager' });
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'user_created',
      resource: 'admin_user',
      resourceId: user._id.toString(),
      details: `Utilisateur ${user.email} cree`,
      ip: req.ip
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la creation de l\'utilisateur.' });
  }
});

router.put('/users/:id', authorize('super_admin'), async (req, res) => {
  try {
    const { name, email, role, active } = req.body;
    const user = await AdminUser.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouve.' });
    }
    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();
    if (role) user.role = role;
    if (typeof active === 'boolean') user.active = active;
    await user.save();
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'user_updated',
      resource: 'admin_user',
      resourceId: user._id.toString(),
      details: `Utilisateur ${user.email} modifie`,
      ip: req.ip
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la modification de l\'utilisateur.' });
  }
});

router.delete('/users/:id', authorize('super_admin'), async (req, res) => {
  try {
    const user = await AdminUser.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouve.' });
    }
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ error: 'Vous ne pouvez pas supprimer votre propre compte.' });
    }
    await AdminUser.findByIdAndDelete(req.params.id);
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'user_deleted',
      resource: 'admin_user',
      resourceId: req.params.id,
      details: `Utilisateur ${user.email} supprime`,
      ip: req.ip
    });
    res.json({ message: 'Utilisateur supprime.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression.' });
  }
});

router.get('/profile', async (req, res) => {
  res.json({ user: req.user });
});

router.put('/profile', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await AdminUser.findById(req.user._id);
    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise a jour du profil.' });
  }
});

module.exports = router;
