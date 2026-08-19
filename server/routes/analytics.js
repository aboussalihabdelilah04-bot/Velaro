const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Client = require('../models/Client');

router.use(auth);

router.get('/overview', async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    const totalBookings = await Booking.countDocuments();
    const recentBookings = await Booking.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
    const totalClients = await Client.countDocuments();

    const bookingsByType = await Booking.aggregate([
      { $group: { _id: '$productType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const topProducts = await Booking.aggregate([
      { $group: { _id: '$productName', count: { $sum: 1 }, revenue: { $sum: '$totalPrice' } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const statusDistribution = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const bookingsTrend = await Booking.aggregate([
      { $match: { createdAt: { $gte: ninetyDaysAgo } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const cancellationRate = totalBookings > 0
      ? (await Booking.countDocuments({ status: 'cancelled' })) / totalBookings * 100
      : 0;

    const clientGrowth = await Client.aggregate([
      { $match: { createdAt: { $gte: ninetyDaysAgo } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalBookings,
      recentBookings,
      totalClients,
      bookingsByType,
      topProducts,
      statusDistribution,
      bookingsTrend,
      cancellationRate: Math.round(cancellationRate * 10) / 10,
      clientGrowth
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

module.exports = router;
