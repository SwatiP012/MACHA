import Booking from '../models/Booking';
import User from '../models/User';
import Notification from '../models/Notification';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

// Create a new booking
exports.createBooking = asyncHandler(async (req, res) => {
  try {
    const { serviceType, date, timeSlot, location, additionalInfo } = req.body;
    
    // Validate request data
    if (!serviceType || !date || !timeSlot || !location) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }
    
    // Create new booking
    const booking = new Booking({
      serviceType,
      date,
      timeSlot,
      location,
      additionalInfo,
      user: req.user._id
    });
    
    await booking.save();
    
    // Populate user details
    await booking.populate('user', 'name email phoneNumber').execPopulate();
    
    // Create notification for admins about new booking
    await Notification.create({
      type: 'booking_created',
      message: `New booking: ${booking.serviceType} from ${req.user.name}`,
      recipient: 'admin', // Special case for admin notifications
      userId: req.user._id,
      entityId: booking._id,
      entityType: 'Booking',
      actionUrl: `/admin/bookings?id=${booking._id}`,
      notifyAdmin: true // Flag to broadcast via WebSocket
    });
    
    return res.status(201).json({ success: true, message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get a single booking by ID
exports.getBookingById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ success: false, message: 'Booking ID is required' });
    }
    
    // Find booking by ID
    const booking = await Booking.findById(id).populate('user', 'name email phoneNumber');
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    return res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update a booking by ID
exports.updateBooking = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceType, date, timeSlot, location, additionalInfo } = req.body;
    
    // Validate request data
    if (!serviceType || !date || !timeSlot || !location) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }
    
    // Find and update booking
    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        serviceType,
        date,
        timeSlot,
        location,
        additionalInfo
      },
      { new: true }
    ).populate('user', 'name email phoneNumber');
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    return res.status(200).json({ success: true, message: 'Booking updated successfully', booking });
  } catch (error) {
    console.error('Error updating booking:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete a booking by ID
exports.deleteBooking = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and delete booking
    const booking = await Booking.findByIdAndDelete(id);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    return res.status(200).json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get bookings for a specific user
exports.getUserBookings = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find bookings by user ID
    const bookings = await Booking.find({ user: userId }).populate('user', 'name email phoneNumber');
    
    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update multiple bookings status
exports.updateMultipleBookingsStatus = asyncHandler(async (req, res) => {
  try {
    const { bookingIds, status } = req.body;
    
    if (!Array.isArray(bookingIds) || bookingIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No booking IDs provided' });
    }
    
    // Update status for multiple bookings
    await Booking.updateMany(
      { _id: { $in: bookingIds } },
      { $set: { status } }
    );
    
    return res.status(200).json({ success: true, message: 'Bookings updated successfully' });
  } catch (error) {
    console.error('Error updating bookings status:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get booking statistics
exports.getBookingStats = asyncHandler(async (req, res) => {
  try {
    // Total bookings
    const totalBookings = await Booking.countDocuments();
    
    // Bookings by status
    const bookingsByStatus = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    return res.status(200).json({ success: true, totalBookings, bookingsByStatus });
  } catch (error) {
    console.error('Error fetching booking stats:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});