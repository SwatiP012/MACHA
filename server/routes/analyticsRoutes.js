const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate');
const adminGuard = require('../middleware/adminGuard');

// Get monthly statistics for analytics dashboard
router.get('/monthly-stats', authenticate, adminGuard, async (req, res) => {
    try {
        // Default date range is the past 12 months
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 11); // Last 12 months

        // Generate month labels for the past 12 months
        const monthlyData = [];
        for (let i = 0; i < 12; i++) {
            const date = new Date();
            date.setMonth(endDate.getMonth() - i);
            const monthLabel = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            const monthKey = `${monthLabel} ${year}`;

            monthlyData.push({
                month: monthKey,
                orders: 0,
                revenue: 0,
                users: 0,
                bookings: 0
            });
        }

        // Reverse to get chronological order
        monthlyData.reverse();

        // Get data for each model
        const User = mongoose.model('User');
        const Order = mongoose.model('Order');
        const Booking = mongoose.model('Booking');

        // Get monthly order data
        if (Order) {
            try {
                const orderData = await Order.aggregate([
                    {
                        $match: {
                            createdAt: { $gte: startDate, $lte: endDate }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                month: { $month: "$createdAt" },
                                year: { $year: "$createdAt" }
                            },
                            count: { $sum: 1 },
                            revenue: { $sum: "$total" }
                        }
                    }
                ]);

                orderData.forEach(data => {
                    const date = new Date();
                    date.setMonth(data._id.month - 1);
                    date.setFullYear(data._id.year);

                    const monthName = date.toLocaleString('default', { month: 'short' });
                    const year = date.getFullYear();
                    const key = `${monthName} ${year}`;

                    const monthData = monthlyData.find(m => m.month === key);
                    if (monthData) {
                        monthData.orders = data.count;
                        monthData.revenue = data.revenue;
                    }
                });
            } catch (err) {
                console.error('Error getting order statistics:', err);
            }
        }

        // Get monthly user data
        if (User) {
            try {
                const userData = await User.aggregate([
                    {
                        $match: {
                            createdAt: { $gte: startDate, $lte: endDate }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                month: { $month: "$createdAt" },
                                year: { $year: "$createdAt" }
                            },
                            count: { $sum: 1 }
                        }
                    }
                ]);

                userData.forEach(data => {
                    const date = new Date();
                    date.setMonth(data._id.month - 1);
                    date.setFullYear(data._id.year);

                    const monthName = date.toLocaleString('default', { month: 'short' });
                    const year = date.getFullYear();
                    const key = `${monthName} ${year}`;

                    const monthData = monthlyData.find(m => m.month === key);
                    if (monthData) {
                        monthData.users = data.count;
                    }
                });
            } catch (err) {
                console.error('Error getting user statistics:', err);
            }
        }

        // Get monthly booking data
        if (Booking) {
            try {
                const bookingData = await Booking.aggregate([
                    {
                        $match: {
                            createdAt: { $gte: startDate, $lte: endDate }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                month: { $month: "$createdAt" },
                                year: { $year: "$createdAt" }
                            },
                            count: { $sum: 1 }
                        }
                    }
                ]);

                bookingData.forEach(data => {
                    const date = new Date();
                    date.setMonth(data._id.month - 1);
                    date.setFullYear(data._id.year);

                    const monthName = date.toLocaleString('default', { month: 'short' });
                    const year = date.getFullYear();
                    const key = `${monthName} ${year}`;

                    const monthData = monthlyData.find(m => m.month === key);
                    if (monthData) {
                        monthData.bookings = data.count;
                    }
                });
            } catch (err) {
                console.error('Error getting booking statistics:', err);
            }
        }

        // Calculate summary statistics
        const totalOrders = await Order.countDocuments() || 0;
        const totalUsers = await User.countDocuments() || 0;
        const totalBookings = await Booking.countDocuments() || 0;

        // Calculate total revenue
        const revenueResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$total" }
                }
            }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

        // Get real service distribution data
        const serviceDistribution = await Order.aggregate([
            {
                $group: {
                    _id: "$serviceType", // Assuming you have a serviceType field
                    value: { $sum: 1 }
                }
            },
            {
                $project: {
                    name: { $ifNull: ["$_id", "Food Delivery"] }, // Default to Food Delivery if null
                    value: 1,
                    _id: 0
                }
            }
        ]);

        // If no service distribution data or empty, provide default data
        if (!serviceDistribution.length) {
            // Get list of available service types from the system
            const services = await Booking.distinct('serviceName');

            if (services && services.length) {
                // Real services with equal distribution
                for (let i = 0; i < services.length; i++) {
                    serviceDistribution.push({
                        name: services[i],
                        value: Math.floor(100 / services.length)
                    });
                }
            } else {
                // Default service distribution
                serviceDistribution.push(
                    { name: 'Food Delivery', value: 45 },
                    { name: 'Grocery', value: 25 },
                    { name: 'Technical Services', value: 15 },
                    { name: 'Events', value: 10 },
                    { name: 'Other', value: 5 }
                );
            }
        }

        // Respond with the data
        res.json({
            success: true,
            monthlyData,
            summary: {
                totalOrders,
                totalRevenue,
                totalUsers,
                totalBookings
            },
            serviceDistribution
        });

    } catch (error) {
        console.error('Error fetching analytics data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch analytics data',
            error: error.message
        });
    }
});

// Get order status distribution
router.get('/order-status', authenticate, adminGuard, async (req, res) => {
    try {
        const Order = mongoose.model('Order');

        // Get real order status distribution
        const statusDistribution = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    value: { $sum: 1 }
                }
            },
            {
                $project: {
                    name: { $ifNull: ["$_id", "Unknown"] },
                    value: 1,
                    _id: 0
                }
            }
        ]);

        // If there's no data, provide default
        if (!statusDistribution.length) {
            return res.json({
                success: true,
                statusDistribution: [
                    { name: 'Delivered', value: 0 },
                    { name: 'Processing', value: 0 },
                    { name: 'Pending', value: 0 },
                    { name: 'Cancelled', value: 0 }
                ]
            });
        }

        res.json({
            success: true,
            statusDistribution
        });

    } catch (error) {
        console.error('Error fetching order status distribution:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch order status distribution',
            error: error.message
        });
    }
});

// Get top selling items or services
router.get('/top-items', authenticate, adminGuard, async (req, res) => {
    try {
        const Order = mongoose.model('Order');

        // Aggregate to find top selling items
        const topItems = await Order.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.name",
                    quantity: { $sum: "$items.quantity" },
                    revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
                }
            },
            { $sort: { revenue: -1 } },
            { $limit: 5 },
            {
                $project: {
                    name: "$_id",
                    quantity: 1,
                    revenue: 1,
                    _id: 0
                }
            }
        ]);

        // If there's no data, respond with empty array
        if (!topItems.length) {
            return res.json({
                success: true,
                topItems: []
            });
        }

        res.json({
            success: true,
            topItems
        });
    } catch (error) {
        console.error('Error fetching top items:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch top selling items',
            error: error.message
        });
    }
});

module.exports = router;