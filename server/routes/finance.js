const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');

router.use(auth);

router.get('/overview', async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    const matchConfirmed = { status: { $in: ['confirmed', 'completed'] } };

    const todayRev = await Booking.aggregate([
      { $match: { ...matchConfirmed, createdAt: { $gte: today } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const weekRev = await Booking.aggregate([
      { $match: { ...matchConfirmed, createdAt: { $gte: weekStart } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const monthRev = await Booking.aggregate([
      { $match: { ...matchConfirmed, createdAt: { $gte: monthStart } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const yearRev = await Booking.aggregate([
      { $match: { ...matchConfirmed, createdAt: { $gte: yearStart } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRev = await Booking.aggregate([
      { $match: matchConfirmed },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const avgValue = await Booking.aggregate([
      { $match: matchConfirmed },
      { $group: { _id: null, avg: { $avg: '$totalPrice' } } }
    ]);

    const byProduct = await Booking.aggregate([
      { $match: matchConfirmed },
      { $group: { _id: '$productType', total: { $sum: '$totalPrice' }, count: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);

    const byMonth = await Booking.aggregate([
      { $match: { ...matchConfirmed, createdAt: { $gte: yearStart } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, total: { $sum: '$totalPrice' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      todayRevenue: todayRev[0]?.total || 0,
      weekRevenue: weekRev[0]?.total || 0,
      monthRevenue: monthRev[0]?.total || 0,
      yearRevenue: yearRev[0]?.total || 0,
      totalRevenue: totalRev[0]?.total || 0,
      avgBookingValue: avgValue[0]?.avg || 0,
      byProduct,
      byMonth
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.get('/monthly', async (req, res) => {
  try {
    const { months = 12 } = req.query;
    const now = new Date();
    const startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
    const data = await Booking.aggregate([
      { $match: { createdAt: { $gte: startDate }, status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, revenue: { $sum: '$totalPrice' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

module.exports = router;
