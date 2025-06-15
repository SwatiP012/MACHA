const mongoose = require('mongoose');
const Notification = require('../models/Notification'); // Assuming you have this model
const { notifyAdmins } = require('../websocket');

/**
 * Create a new notification and send it via WebSocket if applicable
 * @param {Object} notificationData - Notification data
 * @param {Boolean} broadcast - Whether to broadcast via WebSocket
 * @returns {Promise<Object>} The created notification
 */
async function createNotification(notificationData, broadcast = true) {
  try {
    // Create notification in database
    const notification = new Notification({
      ...notificationData,
      createdAt: new Date()
    });
    
    await notification.save();
    
    // Broadcast to admin users via WebSocket if requested
    if (broadcast && notificationData.notifyAdmin) {
      notifyAdmins(notification.toObject());
    }
    
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

/**
 * Mark a notification as read
 * @param {String} notificationId - ID of the notification
 * @param {String} userId - User ID who marked it as read
 * @returns {Promise<Object>} The updated notification
 */
async function markAsRead(notificationId, userId) {
  try {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true, readAt: new Date() },
      { new: true }
    );
    
    return notification;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

/**
 * Get notifications for a specific user
 * @param {String} userId - User ID
 * @param {Object} options - Query options (limit, page, etc.)
 * @returns {Promise<Array>} List of notifications
 */
async function getUserNotifications(userId, options = {}) {
  try {
    const limit = options.limit || 20;
    const skip = options.page ? (options.page - 1) * limit : 0;
    
    const query = { recipient: userId };
    
    if (options.unreadOnly) {
      query.read = false;
    }
    
    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    
    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
}

/**
 * Count unread notifications for a user
 * @param {String} userId - User ID
 * @returns {Promise<Number>} Count of unread notifications
 */
async function countUnreadNotifications(userId) {
  try {
    return await Notification.countDocuments({ 
      recipient: userId,
      read: false
    });
  } catch (error) {
    console.error('Error counting unread notifications:', error);
    throw error;
  }
}

module.exports = {
  createNotification,
  markAsRead,
  getUserNotifications,
  countUnreadNotifications
};
