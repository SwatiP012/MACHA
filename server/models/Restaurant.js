const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  category: String,
  imageUrl: String,
  isVegetarian: Boolean,
  isAvailable: {
    type: Boolean,
    default: true
  },
  popularityScore: {
    type: Number,
    default: 0
  }
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    location: {
      type: { type: String, default: 'Point' },
      coordinates: [Number] // [longitude, latitude]
    }
  },
  contactPhone: {
    type: String,
    required: true
  },
  email: String,
  cuisine: [String],
  menu: [menuItemSchema],
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  imageUrl: String,
  isActive: {
    type: Boolean,
    default: true
  },
  deliveryTime: {
    type: Number, // in minutes
    default: 30
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  minimumOrder: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create geospatial index for location-based queries
restaurantSchema.index({ "address.location": "2dsphere" });

module.exports = mongoose.model('Restaurant', restaurantSchema);
