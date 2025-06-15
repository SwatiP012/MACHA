const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingId: {
    type: String,
    unique: true,
    default: function() {
      return `BK-${Date.now().toString().slice(-8)}-${Math.floor(1000 + Math.random() * 9000)}`;
    }
  },
  bookingNumber: {
    type: Number,
    default: 1
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  trackingId: {
    type: String,
    default: function() {
      return `MCH${Math.random().toString(36).substring(2, 10)}`;
    }
  },
  location: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    },
    details: {
      street: String,
      landmark: String,
      area: String,
      pincode: String
    }
  },
  additionalInfo: String,
  assignedTo: {
    type: String,
    default: null
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to ensure bookingId and other fields are set
bookingSchema.pre('save', function(next) {
  // Set updatedAt on every save
  this.updatedAt = new Date();
  
  // Always ensure bookingId is set to prevent null value
  if (!this.bookingId) {
    this.bookingId = `BK-${Date.now().toString().slice(-8)}-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  
  // Always ensure trackingId is set
  if (!this.trackingId) {
    this.trackingId = `MCH${Math.random().toString(36).substring(2, 10)}`;
  }
  
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
