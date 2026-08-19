const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const { logActivity } = require('../utils/activityLogger');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { status, productType, search, page = 1, limit = 50, sort = '-createdAt' } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (productType) filter.productType = productType;
    if (search) {
      filter.$or = [
        { reference: { $regex: search, $options: 'i' } },
        { clientName: { $regex: search, $options: 'i' } },
        { clientEmail: { $regex: search, $options: 'i' } },
        { productName: { $regex: search, $options: 'i' } }
      ];
    }
    const total = await Booking.countDocuments(filter);
    const bookings = await Booking.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json({ data: bookings, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la recuperation des reservations.' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayCount = await Booking.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } });
    const pendingCount = await Booking.countDocuments({ status: 'pending' });
    const confirmedCount = await Booking.countDocuments({ status: 'confirmed' });
    const cancelledCount = await Booking.countDocuments({ status: 'cancelled' });
    const completedCount = await Booking.countDocuments({ status: 'completed' });
    const totalBookings = await Booking.countDocuments({});

    const todayRevenue = await Booking.aggregate([
      { $match: { createdAt: { $gte: today, $lt: tomorrow }, status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthRevenue = await Booking.aggregate([
      { $match: { createdAt: { $gte: monthStart }, status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const prevMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const prevMonthEnd = new Date(today.getFullYear(), today.getMonth(), 1);
    const prevMonthRevenue = await Booking.aggregate([
      { $match: { createdAt: { $gte: prevMonthStart, $lt: prevMonthEnd }, status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const yearStart = new Date(today.getFullYear(), 0, 1);
    const yearRevenue = await Booking.aggregate([
      { $match: { createdAt: { $gte: yearStart }, status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const weekRevenue = await Booking.aggregate([
      { $match: { createdAt: { $gte: weekStart }, status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const avgBookingValue = await Booking.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, avg: { $avg: '$totalPrice' } } }
    ]);

    const totalBookingValue = await Booking.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const cancelledValue = await Booking.aggregate([
      { $match: { status: 'cancelled' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.json({
      todayCount,
      pendingCount,
      confirmedCount,
      cancelledCount,
      completedCount,
      totalBookings,
      todayRevenue: todayRevenue[0]?.total || 0,
      monthRevenue: monthRevenue[0]?.total || 0,
      prevMonthRevenue: prevMonthRevenue[0]?.total || 0,
      yearRevenue: yearRevenue[0]?.total || 0,
      weekRevenue: weekRevenue[0]?.total || 0,
      avgBookingValue: avgBookingValue[0]?.avg || 0,
      totalBookingValue: totalBookingValue[0]?.total || 0,
      cancelledValue: cancelledValue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors des statistiques.' });
  }
});

router.get('/chart', async (req, res) => {
  try {
    const { period = '30d', startDate, endDate } = req.query;
    let matchStage = {};
    const now = new Date();

    if (startDate && endDate) {
      matchStage.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (period === '7d') {
      matchStage.createdAt = { $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) };
    } else if (period === '30d') {
      matchStage.createdAt = { $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) };
    } else if (period === '12m') {
      matchStage.createdAt = { $gte: new Date(now.getFullYear() - 1, now.getMonth(), 1) };
    }

    const bookingsByDay = await Booking.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
          revenue: { $sum: { $cond: [{ $in: ['$status', ['confirmed', 'completed']] }, '$totalPrice', 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(bookingsByDay);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors des donnees du graphique.' });
  }
});

router.get('/by-type', async (req, res) => {
  try {
    const result = await Booking.aggregate([
      { $group: { _id: '$productType', count: { $sum: 1 }, revenue: { $sum: '$totalPrice' } } },
      { $sort: { count: -1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.get('/recent', async (req, res) => {
  try {
    const bookings = await Booking.find().sort('-createdAt').limit(10);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Reservation non trouvee.' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Erreur.' });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const { status, cancellationReason } = req.body;
    const validTransitions = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['completed', 'cancelled'],
      completed: [],
      cancelled: []
    };
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Reservation non trouvee.' });
    if (!validTransitions[booking.status].includes(status)) {
      return res.status(400).json({ error: `Transition de ${booking.status} vers ${status} non autorisee.` });
    }
    const oldStatus = booking.status;
    booking.status = status;
    if (status === 'cancelled') {
      booking.cancellationReason = cancellationReason || '';
      booking.cancelledBy = 'admin';
    }
    await booking.save();
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'booking_status_changed',
      resource: 'booking',
      resourceId: booking._id.toString(),
      details: `Reservation ${booking.reference}: ${oldStatus} → ${status}`,
      ip: req.ip
    });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise a jour.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Reservation non trouvee.' });
    const allowed = ['clientName', 'clientEmail', 'clientPhone', 'notes', 'paymentStatus', 'paymentMethod', 'startDate', 'endDate', 'people'];
    allowed.forEach(field => {
      if (req.body[field] !== undefined) booking[field] = req.body[field];
    });
    await booking.save();
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'booking_updated',
      resource: 'booking',
      resourceId: booking._id.toString(),
      details: `Reservation ${booking.reference} modifiee`,
      ip: req.ip
    });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise a jour.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Reservation non trouvee.' });
    await Booking.findByIdAndDelete(req.params.id);
    await logActivity({
      user: req.user.name,
      userId: req.user._id,
      action: 'booking_deleted',
      resource: 'booking',
      resourceId: req.params.id,
      details: `Reservation ${booking.reference} supprimee`,
      ip: req.ip
    });
    res.json({ message: 'Reservation supprimee.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression.' });
  }
});

module.exports = router;
