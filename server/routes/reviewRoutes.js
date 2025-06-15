const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');

// Get all reviews (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
    
    const reviews = await Review.find({ approved: true })
      .populate('userId', 'name')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
      
    const total = await Review.countDocuments({ approved: true });
    
    res.json({
      success: true,
      reviews,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching reviews'
    });
  }
});

// Get reviews by service type
router.get('/service/:serviceType', async (req, res) => {
  try {
    const { serviceType } = req.params;
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
    
    const reviews = await Review.find({ 
      serviceType, 
      approved: true 
    })
      .populate('userId', 'name')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
      
    const total = await Review.countDocuments({ serviceType, approved: true });
    
    res.json({
      success: true,
      reviews,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching reviews by service type:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching reviews by service'
    });
  }
});

// Add authentication middleware for protected routes
router.use(auth);

// Create review (authenticated users)
router.post('/', async (req, res) => {
  try {
    const { orderId, rating, comment, serviceType } = req.body;
    
    if (!orderId || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and rating are required'
      });
    }
    
    // Verify order belongs to user
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Check if order belongs to user
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only review your own orders'
      });
    }
    
    // Check if order has been completed
    if (order.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'You can only review completed orders'
      });
    }
    
    // Check if review already exists for this order
    const existingReview = await Review.findOne({ orderId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this order'
      });
    }
    
    // Create new review
    const review = new Review({
      userId: req.user._id,
      orderId,
      serviceType: serviceType || order.serviceType,
      rating,
      comment: comment || '',
      approved: false // Require admin approval before public display
    });
    
    await review.save();
    
    res.status(201).json({
      success: true,
      message: 'Review submitted for approval',
      review
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error creating review'
    });
  }
});

// Get user's reviews
router.get('/user', async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user._id })
      .sort('-createdAt')
      .populate('orderId', 'serviceType createdAt');
      
    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching user reviews'
    });
  }
});

// Update user's review
router.put('/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;
    
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Ensure user owns the review
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own reviews'
      });
    }
    
    // Update review
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    
    // Reset approval status if review content changes
    review.approved = false;
    
    await review.save();
    
    res.json({
      success: true,
      message: 'Review updated and submitted for approval',
      review
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating review'
    });
  }
});

// Admin routes
router.use(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
  next();
});

// Admin: Get all reviews including unapproved
router.get('/admin/all', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt', approved } = req.query;
    
    const filter = {};
    if (approved !== undefined) {
      filter.approved = approved === 'true';
    }
    
    const reviews = await Review.find(filter)
      .populate('userId', 'name email')
      .populate('orderId', 'serviceType createdAt')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
      
    const total = await Review.countDocuments(filter);
    
    res.json({
      success: true,
      reviews,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching admin reviews:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching admin reviews'
    });
  }
});

// Admin: Approve or reject review
router.patch('/admin/:id/approval', async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;
    
    if (approved === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Approval status is required'
      });
    }
    
    const review = await Review.findById(id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    review.approved = approved;
    await review.save();
    
    res.json({
      success: true,
      message: approved ? 'Review approved' : 'Review rejected',
      review
    });
  } catch (error) {
    console.error('Error updating review approval:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating review approval'
    });
  }
});

module.exports = router;
