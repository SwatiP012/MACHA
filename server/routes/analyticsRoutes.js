const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const adminGuard = require('../middleware/adminGuard');
const User = require('../models/User');
const Order = require('../models/Order');
const Booking = require('../models/Booking');
const Message = require('../models/Message');

// Get monthly stats for the last 12 months
router.get('/monthly-stats', authenticate, adminGuard, async (req, res) => {
    try {
        const now = new Date();
        const months = [];

        for (let i = 0; i < 12; i++) {
            const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

            const users = await User.countDocuments({ createdAt: { $gte: start, $lt: end }, role: 'user' });
            const orders = await Order.countDocuments({ createdAt: { $gte: start, $lt: end } });
            const bookings = await Booking.countDocuments({ createdAt: { $gte: start, $lt: end } });
            const messages = await Message.countDocuments({ createdAt: { $gte: start, $lt: end } });

            months.unshift({
                month: start.toLocaleString('default', { month: 'short', year: 'numeric' }),
                users,
                orders,
                bookings,
                messages
            });
        }

        res.json({ success: true, months });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch monthly stats', error: error.message });
    }
});

module.exports = router;