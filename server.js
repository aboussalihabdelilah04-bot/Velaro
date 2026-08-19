require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.VERCEL) {
  app.set('trust proxy', 1);
}

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Trop de requetes, veuillez reessayer plus tard.' }
});
app.use('/api/', apiLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Trop de tentatives de connexion.' }
});
app.use('/api/auth/login', authLimiter);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/velarocars')
  .then(() => console.log('MongoDB connecte'))
  .catch(err => {
    console.error('Erreur MongoDB:', err.message);
    console.log('Le serveur continue sans base de donnees. Les fonctionnalites API ne seront pas disponibles.');
  });

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err.message);
});

app.use('/api/public', require('./server/routes/public'));
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/admin', require('./server/routes/admin'));
app.use('/api/bookings', require('./server/routes/bookings'));
app.use('/api/cars', require('./server/routes/cars'));
app.use('/api/motorcycles', require('./server/routes/motorcycles'));
app.use('/api/villas', require('./server/routes/villas'));
app.use('/api/excursions', require('./server/routes/excursions'));
app.use('/api/transfers', require('./server/routes/transfers'));
app.use('/api/packs', require('./server/routes/packs'));
app.use('/api/clients', require('./server/routes/clients'));
app.use('/api/messages', require('./server/routes/messages'));
app.use('/api/reviews', require('./server/routes/reviews'));
app.use('/api/gallery', require('./server/routes/gallery'));
app.use('/api/finance', require('./server/routes/finance'));
app.use('/api/analytics', require('./server/routes/analytics'));
app.use('/api/settings', require('./server/routes/settings'));
app.use('/api/activity-logs', require('./server/routes/activityLogs'));
app.use('/api/emails', require('./server/routes/emailLogs'));
app.use('/api/content', require('./server/routes/content'));
app.use('/api/languages', require('./server/routes/languages'));

app.get('/admin.html', (req, res) => {
  res.redirect(301, '/admin/');
});

app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.use('/', express.static(path.join(__dirname), {
  index: 'index.html',
  extensions: ['html']
}));

app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur.' });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`VelaroCars serveur demarre sur le port ${PORT}`);
  });
}

module.exports = app;
