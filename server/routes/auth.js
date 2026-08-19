const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const auth = require('../middleware/auth');
const { generateTokens, saveRefreshToken, verifyRefreshToken, removeRefreshToken } = require('../utils/tokens');
const { logActivity } = require('../utils/activityLogger');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis.' });
    }
    const user = await AdminUser.findOne({ email: email.toLowerCase() });
    if (!user || !user.active) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }
    user.lastLogin = new Date();
    await user.save();

    const { accessToken, refreshToken } = generateTokens(user);
    await saveRefreshToken(user._id, refreshToken, req);

    await logActivity({
      user: user.name,
      userId: user._id,
      action: 'login',
      resource: 'auth',
      details: 'Connexion reussie',
      ip: req.ip
    });

    res.json({ accessToken, refreshToken, user: user.toJSON() });
  } catch (err) {
    console.error('Login error:', err.message, err.stack);
    res.status(500).json({ error: 'Erreur lors de la connexion.' });
  }
});

router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token requis.' });
    }
    const decoded = await verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json({ error: 'Refresh token invalide.' });
    }
    const user = await AdminUser.findById(decoded.id).select('-password');
    if (!user || !user.active) {
      return res.status(401).json({ error: 'Utilisateur non autorise.' });
    }
    await removeRefreshToken(refreshToken);
    const tokens = generateTokens(user);
    await saveRefreshToken(user._id, tokens.refreshToken, req);
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors du rafraichissement du token.' });
  }
});

router.post('/logout', auth, async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await removeRefreshToken(refreshToken);
    }
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'logout',
      resource: 'auth',
      details: 'Deconnexion',
      ip: req.ip
    });
    res.json({ message: 'Deconnexion reussie.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la deconnexion.' });
  }
});

router.get('/me', auth, async (req, res) => {
  res.json({ user: req.user });
});

router.post('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Mot de passe actuel et nouveau mot de passe requis.' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir au moins 8 caracteres.' });
    }
    const user = await AdminUser.findById(req.user._id);
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Mot de passe actuel incorrect.' });
    }
    user.password = newPassword;
    await user.save();
    await logActivity({
      user: user.name,
      userId: user._id,
      action: 'password_change',
      resource: 'auth',
      details: 'Mot de passe modifie',
      ip: req.ip
    });
    res.json({ message: 'Mot de passe modifie avec succes.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors du changement de mot de passe.' });
  }
});

// TEMPORARY: Setup admin user endpoint (will be removed after testing)
router.post('/setup-admin', async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@velarocars.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@2024!';
    const adminName = process.env.ADMIN_NAME || 'VelaroCar Admin';
    
    let admin = await AdminUser.findOne({ email: adminEmail.toLowerCase() });
    if (!admin) {
      admin = await AdminUser.create({
        name: adminName,
        email: adminEmail.toLowerCase(),
        password: adminPassword,
        role: 'super_admin'
      });
      res.json({ message: 'Admin created', email: admin.email });
    } else {
      admin.password = adminPassword;
      await admin.save();
      res.json({ message: 'Admin password reset', email: admin.email });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
