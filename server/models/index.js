const mongoose = require('mongoose');

// Import model definitions (these should use mongoose.model internally)
require('./User');
require('./Booking');
require('./Service');
require('./ChatMessage');
require('./Order');
require('./Review');
require('./Restaurant');
require('./groceryModels');

// Log model collections (optional debug info)
console.log(`User model: ${mongoose.model('User').collection.name}`);
console.log(`Booking model: ${mongoose.model('Booking').collection.name}`);
console.log(`Service model: ${mongoose.model('Service').collection.name}`);
console.log(`ChatMessage model: ${mongoose.model('ChatMessage').collection.name}`);
console.log(`Order model: ${mongoose.model('Order').collection.name}`);
console.log(`Review model: ${mongoose.model('Review').collection.name}`);
console.log(`Restaurant model: ${mongoose.model('Restaurant').collection.name}`);

console.log('All models registered');

// Export the models for convenience
module.exports = {
  User: mongoose.model('User'),
  Booking: mongoose.model('Booking'),
  Service: mongoose.model('Service'),
  ChatMessage: mongoose.model('ChatMessage'),
  Order: mongoose.model('Order'),
  Review: mongoose.model('Review'),
  Restaurant: mongoose.model('Restaurant')
};
