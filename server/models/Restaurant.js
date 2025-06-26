const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define menu item schema
const menuItemSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, default: 'Main Course' },
  imageUrl: String,
  isVegetarian: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  popularityScore: { type: Number, default: 0 }
}, { timestamps: true });

// Define restaurant schema
const restaurantSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  address: {
    street: String,
    city: { type: String, default: 'Choutuppal' },
    state: { type: String, default: 'Telangana' },
    pincode: String
  },
  contactPhone: { type: String },
  email: String,
  cuisine: [{ type: String }],
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  imageUrl: String,
  rating: { type: Number, min: 0, max: 5, default: 0 },
  deliveryTime: { type: Number, default: 30 },
  deliveryFee: { type: Number, default: 40 },
  minimumOrder: { type: Number, default: 100 },
  isActive: { type: Boolean, default: true },
  // Owner info with userId reference to User model
  owner: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Add this line to reference User model
  },
  menu: [menuItemSchema],
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

// Add text index for search functionality
restaurantSchema.index({ name: 'text', 'cuisine': 'text', description: 'text' });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;