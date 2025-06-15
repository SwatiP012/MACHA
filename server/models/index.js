const User = require('./User');
const Booking = require('./Booking');
const Service = require('./Service');
const ChatMessage = require('./ChatMessage');
const Order = require('./Order');
const Review = require('./Review');

// Initialize any models that might be missing from your collections
// This ensures all schemas are registered with mongoose
const initializeModels = () => {
  console.log('Initializing MongoDB models...');
  console.log(`User model: ${User.collection.name}`);
  console.log(`Booking model: ${Booking.collection.name}`);
  console.log(`Service model: ${Service.collection.name}`);
  console.log(`ChatMessage model: ${ChatMessage.collection.name}`);
  console.log(`Order model: ${Order.collection.name}`);
  console.log(`Review model: ${Review.collection.name}`);
};

module.exports = {
  User,
  Booking,
  Service,
  ChatMessage,
  Order,
  Review,
  initializeModels
};
