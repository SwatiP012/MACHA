const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const adminGuard = require('../middleware/adminGuard');
const User = require('../models/User');
const Order = require('../models/Order');
const Booking = require('../models/Booking');
const Message = require('../models/Message');
const Restaurant = require('../models/Restaurant');

// Get admin dashboard stats - real data from database
router.get('/stats', authenticate, adminGuard, async (req, res) => {
  try {
    // Count users
    const totalUsers = await User.countDocuments();

    // Count orders and get status breakdowns
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const completedOrders = await Order.countDocuments({ status: 'completed' });

    // Success rate calculation
    const successRate = totalOrders > 0
      ? Math.round((completedOrders / totalOrders) * 100)
      : 0;

    // Count messages
    const totalMessages = await Message.countDocuments();

    // Count bookings
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });

    res.json({
      users: {
        total: totalUsers
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        completed: completedOrders,
        successRate: successRate
      },
      bookings: {
        total: totalBookings,
        pending: pendingBookings
      },
      messages: {
        total: totalMessages
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin statistics',
      error: error.message
    });
  }
});

// Get orders with pagination - real data from database
router.get('/orders', authenticate, adminGuard, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    // Build query based on status filter
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    // Get total count for pagination
    const total = await Order.countDocuments(query);

    // Fetch orders with user info
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email');

    res.json({
      success: true,
      orders,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

// Get users with pagination and filtering
router.get('/users', authenticate, adminGuard, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const role = req.query.role;
    const search = req.query.search;

    // Build query based on filters
    let query = {};

    if (role && role !== 'all') {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } }
      ];
    }

    // Get total count for pagination
    const total = await User.countDocuments(query);

    // Fetch users
    const users = await User.find(query)
      .select('-password') // Exclude passwords
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// Get detailed info for a specific user including order history
router.get('/users/:userId/details', authenticate, adminGuard, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get user details
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user orders
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).limit(10);

    // Get user bookings
    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 }).limit(10);

    // Get user messages
    const messages = await Message.find({ userId }).sort({ createdAt: -1 }).limit(10);

    res.json({
      success: true,
      user,
      orders,
      bookings,
      messages,
      loginHistory: user.loginHistory || []
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user details',
      error: error.message
    });
  }
});

router.get('/restaurants', authenticate, adminGuard, async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      restaurants
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurants',
      error: error.message
    });
  }
});

// Get bookings with pagination and filtering
router.get('/bookings', authenticate, adminGuard, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    // Build query based on status filter
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    // Get total count for pagination
    const total = await Booking.countDocuments(query);

    // Fetch bookings with user info
    const bookings = await Booking.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email');

    res.json({
      success: true,
      bookings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

// UPDATE BOOKING STATUS - NEW ENDPOINT
router.patch('/bookings/:bookingId/status', authenticate, adminGuard, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!bookingId || !status) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID and status are required'
      });
    }

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    // Find and update the booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update status and save
    booking.status = status;
    booking.updatedAt = new Date();
    await booking.save();

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking status',
      error: error.message
    });
  }
});

// ASSIGN BOOKING TO STAFF/USER - NEW ENDPOINT
router.patch('/bookings/:bookingId/assign', authenticate, adminGuard, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { assignedTo } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required'
      });
    }

    // Find the booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update assignee and save
    booking.assignedTo = assignedTo || null;
    booking.updatedAt = new Date();
    await booking.save();

    res.json({
      success: true,
      message: 'Booking assignment updated successfully',
      booking
    });
  } catch (error) {
    console.error('Error assigning booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to assign booking',
      error: error.message
    });
  }
});

// ADD/UPDATE BOOKING NOTES - NEW ENDPOINT
router.patch('/bookings/:bookingId/notes', authenticate, adminGuard, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { notes } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required'
      });
    }

    // Find the booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update notes and save
    booking.notes = notes;
    booking.updatedAt = new Date();
    await booking.save();

    res.json({
      success: true,
      message: 'Booking notes updated successfully',
      booking
    });
  } catch (error) {
    console.error('Error updating booking notes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking notes',
      error: error.message
    });
  }
});

// Get specific booking by ID - NEW ENDPOINT
router.get('/bookings/:bookingId', authenticate, adminGuard, async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId)
      .populate('userId', 'name email phoneNumber');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking details',
      error: error.message
    });
  }
});

// DELETE booking - NEW ENDPOINT
router.delete('/bookings/:bookingId', authenticate, adminGuard, async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndDelete(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking',
      error: error.message
    });
  }
});

// Notification endpoints
router.get('/notifications', authenticate, adminGuard, async (req, res) => {
  try {
    // Fetch notifications from the database (mocked data for now)
    const notifications = [
      { id: 1, message: 'New order received', read: false },
      { id: 2, message: 'User registered', read: true },
      { id: 3, message: 'Booking confirmed', read: false }
    ];

    res.json({
      success: true,
      notifications
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
      error: error.message
    });
  }
});

router.patch('/notifications/:id/read', authenticate, adminGuard, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the notification by ID (mocked logic for now)
    let notification = { id: id, message: 'Sample notification', read: false };

    // Mark as read
    notification.read = true;

    res.json({
      success: true,
      message: 'Notification marked as read',
      notification
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read',
      error: error.message
    });
  }
});

router.patch('/notifications/mark-all-read', authenticate, adminGuard, async (req, res) => {
  try {
    // Mocked logic to mark all notifications as read
    const notifications = [
      { id: 1, message: 'New order received', read: false },
      { id: 2, message: 'User registered', read: false },
      { id: 3, message: 'Booking confirmed', read: false }
    ];

    notifications.forEach(notification => {
      notification.read = true;
    });

    res.json({
      success: true,
      message: 'All notifications marked as read',
      notifications
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark all notifications as read',
      error: error.message
    });
  }
});

module.exports = router;
