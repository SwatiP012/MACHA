const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authenticate = require('../middleware/authenticate');
const adminGuard = require('../middleware/adminGuard');
const mongoose = require('mongoose');

// Create a new booking - add error handling for location format
router.post('/', authenticate, async (req, res) => {
  try {
    console.log('Booking request received:', req.body);
    const { serviceType, date, timeSlot, location, additionalInfo, allowDuplicate } = req.body;

    // Basic validation
    if (!serviceType || !date || !timeSlot || !location) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Ensure location has the correct format
    let formattedLocation = location;
    if (typeof location === 'string') {
      formattedLocation = {
        address: location,
        coordinates: { lat: null, lng: null },
        details: {}
      };
    }

    // Check for duplicate bookings if allowDuplicate is not true
    if (!allowDuplicate) {
      const existingBooking = await Booking.findOne({
        userId: req.user._id,
        serviceType,
        date: new Date(date).toISOString().split('T')[0],
        status: { $nin: ['cancelled', 'completed'] }
      });

      if (existingBooking) {
        return res.status(409).json({
          success: false,
          message: 'You already have an active booking for this service on this date'
        });
      }
    }

    // Generate a unique bookingId and tracking ID
    const bookingId = `BK-${Date.now().toString().slice(-8)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingId = `MCH${Math.random().toString(36).substring(2, 10)}`;

    // Get maximum booking number and increment
    const maxBookingNumber = await Booking.findOne().sort('-bookingNumber');
    const bookingNumber = maxBookingNumber ? maxBookingNumber.bookingNumber + 1 : 1;

    // Create new booking with properly formatted location
    const newBooking = new Booking({
      userId: req.user._id,
      bookingId,
      trackingId,
      bookingNumber,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phoneNumber,
      serviceType,
      date,
      timeSlot,
      location: formattedLocation,
      additionalInfo,
      status: 'pending',
    });

    console.log('Created booking object:', newBooking);
    await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: newBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
});

// Get all bookings - admin only
router.get('/', authenticate, adminGuard, async (req, res) => {
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

// Get user's bookings - allow a user to see their booking history
router.get('/user-bookings', authenticate, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get user's bookings with pagination
    const total = await Booking.countDocuments({ userId: req.user._id });

    const bookings = await Booking.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

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
    console.error('Error fetching user bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

// Get single booking by ID
router.get('/user-bookings/:bookingId', authenticate, async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Validate MongoDB ID format
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID format'
      });
    }

    // Find booking by ID and user ID (for security)
    const booking = await Booking.findOne({
      _id: bookingId,
      userId: req.user._id
    });

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
      message: 'Server error while fetching booking',
      error: error.message
    });
  }
});

// Update booking status - admin only
// ...existing code...
// Assign booking to staff - admin only
router.patch('/:id/assign', authenticate, adminGuard, async (req, res) => {
  try {
    const { assignedTo, notes } = req.body;

    // Fetch the booking first
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.assignedTo = assignedTo;
    if (notes !== undefined) booking.notes = notes;
    booking.updatedAt = Date.now();
    await booking.save();

    res.json({
      success: true,
      message: 'Booking assigned successfully',
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
// ...existing code...

// Cancel booking - users can cancel their own bookings
router.patch('/:id/cancel', authenticate, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only the booking owner or admin can cancel
    if (req.user.role !== 'admin' && booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to cancel this booking'
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    booking.updatedAt = Date.now();
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message
    });
  }
});

// Assign booking to staff - admin only
router.patch('/:id/assign', authenticate, adminGuard, async (req, res) => {
  try {
    const { assignedTo, notes } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo,
        notes: notes || booking.notes,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking assigned successfully',
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

// Get booking by tracking ID - public endpoint for tracking
router.get('/track/:trackingId', async (req, res) => {
  try {
    const { trackingId } = req.params;

    const booking = await Booking.findOne({ trackingId })
      .select('-__v -notes -updatedAt');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found with this tracking ID'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Error tracking booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track booking',
      error: error.message
    });
  }
});

module.exports = router;
