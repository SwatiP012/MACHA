const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const Order = require('../models/Order');
const Message = require('../models/Message');
const Booking = require('../models/Booking'); // Add this import
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Sample mock data for development
const mockData = {
  stats: {
    users: { total: 1478 },
    orders: { 
      total: 356, 
      pending: 45, 
      completed: 298, 
      successRate: 84 
    },
    messages: { total: 42 }
  },
  orders: [
    {
      _id: '60d21b4967d0d8992e610c85',
      userId: { name: 'John Doe' },
      serviceType: 'Food Delivery',
      status: 'completed',
      createdAt: new Date().toISOString(),
    },
    {
      _id: '60d21b4967d0d8992e610c86',
      userId: { name: 'Jane Smith' },
      serviceType: 'Grocery Delivery',
      status: 'pending',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: '60d21b4967d0d8992e610c87',
      userId: { name: 'Mike Johnson' },
      serviceType: 'Technician Service',
      status: 'processing',
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
  ]
};

// Middleware to ensure the user is an admin
const adminCheck = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }
  
  if (req.user.role === 'admin') {
    return next();
  }
  
  return res.status(403).json({ 
    success: false,
    message: 'Access denied. You must be an admin to access this resource.' 
  });
};

// Apply authentication middleware
router.use(auth);
router.use(adminCheck);

// Debug endpoint to test authentication
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Admin authentication successful',
    user: req.user
  });
});

// Get admin dashboard stats
router.get('/stats', auth, (req, res) => {
  res.json(mockData.stats);
});

// Get orders with pagination
router.get('/orders', auth, (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  
  res.json({
    orders: mockData.orders.slice(0, limit),
    pagination: {
      total: mockData.orders.length,
      page: 1,
      limit,
      pages: Math.ceil(mockData.orders.length / limit)
    }
  });
});

// User management routes
router.get('/users', auth, adminCheck, async (req, res) => {
  try {
    const { limit = 10, page = 1, search = '', role } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build query based on filters
    const query = {};
    
    // Filter by role if specified
    if (role && role !== 'all') {
      query.role = role;
    }
    
    // Search by name or email if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Execute query with pagination
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await User.countDocuments(query);
    
    res.json({
      success: true,
      users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/users/:id', auth, adminCheck, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user' });
  }
});

// Create new user
router.post('/users', auth, adminCheck, async (req, res) => {
  try {
    const { name, email, password, phoneNumber, role } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }
    
    // Create user with secure password
    const user = new User({
      name,
      email: email.toLowerCase(),
      password, // Will be hashed by the User model pre-save hook
      phoneNumber,
      role: role || 'user'
    });
    
    await user.save();
    
    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Failed to create user' });
  }
});

// Update user
router.put('/users/:id', auth, adminCheck, async (req, res) => {
  try {
    const { name, email, password, phoneNumber, role } = req.body;
    
    // Find user
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Check if email is already in use by another user
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser && existingUser._id.toString() !== req.params.id) {
        return res.status(400).json({ success: false, message: 'Email is already in use' });
      }
    }
    
    // Update fields
    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (role) user.role = role;
    
    // Update password if provided
    if (password) {
      user.password = password; // Will be hashed by the User model pre-save hook
    }
    
    await user.save();
    
    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({
      success: true,
      message: 'User updated successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
});

// Update only user role
router.put('/users/:id/role', auth, adminCheck, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({
      success: true,
      message: `User role updated to ${role}`,
      user
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ success: false, message: 'Failed to update user role' });
  }
});

// Delete user
router.delete('/users/:id', auth, adminCheck, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Prevent deleting self
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
});

// Bulk delete users
router.post('/users/bulk-delete', auth, adminCheck, async (req, res) => {
  try {
    const { userIds } = req.body;
    
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No user IDs provided' });
    }
    
    // Prevent deleting self
    if (userIds.includes(req.user._id.toString())) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account' });
    }
    
    const result = await User.deleteMany({ _id: { $in: userIds } });
    
    res.json({
      success: true,
      message: `${result.deletedCount} users deleted successfully`
    });
  } catch (error) {
    console.error('Error bulk deleting users:', error);
    res.status(500).json({ success: false, message: 'Failed to delete users' });
  }
});

// Get admin profile
router.get('/profile', auth, adminCheck, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching profile'
    });
  }
});

// Update admin profile
router.put('/profile', auth, adminCheck, async (req, res) => {
  try {
    const { name, email, phoneNumber, address, profileImage } = req.body;
    
    // Validate input
    if (!name || !email || !phoneNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and phone number are required' 
      });
    }
    
    // Check if email is already in use by another user
    if (email !== req.user.email) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email is already in use by another user' 
        });
      }
    }
    
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // Update user fields
    user.name = name;
    user.email = email.toLowerCase();
    user.phoneNumber = phoneNumber;
    user.address = address || '';
    if (profileImage) user.profileImage = profileImage;
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        address: user.address,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.error('Error updating admin profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating profile'
    });
  }
});

// Change admin password
router.put('/change-password', auth, adminCheck, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current password and new password are required' 
      });
    }
    
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current password is incorrect' 
      });
    }
    
    // Update password
    user.password = newPassword; // Will be hashed by pre-save hook
    await user.save();
    
    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Error updating admin password:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating password'
    });
  }
});

// Upload profile image
router.post('/upload-image', auth, adminCheck, async (req, res) => {
  try {
    // Image upload logic here
    // This would typically use a library like multer for handling file uploads
    // And then upload to a service like AWS S3, Cloudinary, etc.
    
    // For now, we'll just return a placeholder response
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: 'https://via.placeholder.com/150'
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error uploading image'
    });
  }
});

// Get detailed user information with history
router.get('/users/:id/details', auth, async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Get user's orders
    const orders = await Order.find({ userId: user._id }).sort({ createdAt: -1 }).limit(10);
    
    // Get user's bookings (if you have a Booking model)
    let bookings = [];
    try {
      // Check if the Booking model exists
      if (mongoose.modelNames().includes('Booking')) {
        const Booking = mongoose.model('Booking');
        bookings = await Booking.find({ userId: user._id }).sort({ date: -1 }).limit(10);
      }
    } catch (err) {
      console.log('Bookings model not available:', err.message);
    }
    
    // Get user's messages
    const messages = await Message.find({ userId: user._id }).sort({ createdAt: -1 }).limit(10);
    
    // Get login history (if available)
    const loginHistory = user.loginHistory || [];
    
    res.json({
      success: true,
      user,
      orders,
      bookings,
      messages,
      loginHistory
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user details' });
  }
});

// Get bookings with pagination and filters
router.get('/bookings', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const search = req.query.search;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    
    const query = {};
    
    // Apply filters
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { 'userName': { $regex: search, $options: 'i' } },
        { 'serviceType': { $regex: search, $options: 'i' } },
        { 'address': { $regex: search, $options: 'i' } }
      ];
    }
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else if (startDate) {
      query.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.date = { $lte: new Date(endDate) };
    }
    
    // Calculate pagination parameters
    const skip = (page - 1) * limit;
    
    // Find bookings with pagination - now using the imported model directly
    const bookings = await Booking.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email phoneNumber');
    
    // Format bookings for frontend
    const formattedBookings = bookings.map(booking => {
      return {
        ...booking._doc,
        userName: booking.userId ? booking.userId.name : booking.userName || 'Unknown',
        userPhone: booking.userId ? booking.userId.phoneNumber : booking.userPhone || null,
        userEmail: booking.userId ? booking.userId.email : null
      };
    });
    
    // Get total count for pagination
    const total = await Booking.countDocuments(query);
    
    res.json({ 
      success: true, 
      bookings: formattedBookings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
});

// Get single booking by ID
router.get('/bookings/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'name email phoneNumber');
      
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    // Format booking for frontend
    const formattedBooking = {
      ...booking._doc,
      userName: booking.userId ? booking.userId.name : booking.userName || 'Unknown',
      userPhone: booking.userId ? booking.userId.phoneNumber : booking.userPhone || null,
      userEmail: booking.userId ? booking.userId.email : null
    };
    
    res.json({ success: true, booking: formattedBooking });
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch booking details' });
  }
});

// Update booking status
router.put('/bookings/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    res.json({ success: true, booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ success: false, message: 'Failed to update booking status' });
  }
});

// Assign service provider
router.put('/bookings/:id/assign', auth, async (req, res) => {
  try {
    const { assignedTo } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { assignedTo, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    res.json({ success: true, booking });
  } catch (error) {
    console.error('Error assigning service provider:', error);
    res.status(500).json({ success: false, message: 'Failed to assign service provider' });
  }
});

// Update admin notes
router.put('/bookings/:id/notes', auth, async (req, res) => {
  try {
    const { adminNotes } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { adminNotes, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    res.json({ success: true, booking });
  } catch (error) {
    console.error('Error updating admin notes:', error);
    res.status(500).json({ success: false, message: 'Failed to update notes' });
  }
});

module.exports = router;
