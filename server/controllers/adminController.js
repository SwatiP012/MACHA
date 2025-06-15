const User = require('../models/User');
const Order = require('../models/Order');
const Message = require('../models/Message');
const Notification = require('../models/Notification');
const { markAsRead } = require('../services/notificationService');

// GET /api/admin/stats
exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const completedOrders = await Order.countDocuments({ status: 'completed' });
    const totalMessages = await Message.countDocuments();

    const successRate = totalOrders > 0
      ? Math.round((completedOrders / totalOrders) * 100)
      : 0;

    return res.json({
      users: { total: totalUsers },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        completed: completedOrders,
        successRate: successRate,
      },
      messages: { total: totalMessages },
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};

// GET /api/admin/orders?limit=5
exports.getRecentOrders = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const status = req.query.status;
    
    const query = {};
    if (status) query.status = status;
    
    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email phoneNumber');
    
    const total = await Order.countDocuments(query);

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
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Failed to fetch recent orders' });
  }
};

// Mark notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Update in database
    await markAsRead(id, req.user._id);
    
    return res.json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read',
      error: error.message
    });
  }
};

// Mark all notifications as read
exports.markAllNotificationsAsRead = async (req, res) => {
  try {
    // Update all notifications for this user
    await Notification.updateMany(
      { recipient: req.user._id, read: false },
      { read: true, readAt: new Date() }
    );
    
    return res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to mark all notifications as read',
      error: error.message
    });
  }
};
