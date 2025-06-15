require('dotenv').config({ path: '../../.env' });
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const { User, Service, Booking, ChatMessage, Order, Review } = require('../models');

const initializeDatabase = async () => {
  try {
    // Connect to MongoDB
    const conn = await connectDB();
    console.log(`Connected to MongoDB: ${conn.connection.name}`);
    
    // Test creating dummy data to ensure all collections exist
    console.log('Testing collection creation by inserting sample documents...');
    
    // Create test user if doesn't exist
    const testUser = await User.findOne({ email: 'test@example.com' });
    const user = testUser || await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      phoneNumber: '1234567890',
      role: 'user'
    });
    
    console.log('Test user created:', user._id);
    
    // Create test service if doesn't exist
    const testService = await Service.findOne({ name: 'Test Service' });
    const service = testService || await Service.create({
      name: 'Test Service',
      category: 'other',
      description: 'This is a test service',
      price: 100,
      priceUnit: 'fixed',
      isAvailable: true
    });
    
    console.log('Test service created:', service._id);
    
    // Create test booking if doesn't exist
    const testBooking = await Booking.findOne({ email: 'test@example.com' });
    const booking = testBooking || await Booking.create({
      name: 'Test Booking',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      serviceType: 'Test Service',
      address: 'Test Address',
      scheduledDate: new Date(),
      scheduledTime: '10:00 AM',
      notes: 'Test notes',
      user: user._id
    });
    
    console.log('Test booking created:', booking._id);
    
    // Create test message if doesn't exist
    const testMessage = await ChatMessage.findOne({ text: 'Test message' });
    const message = testMessage || await ChatMessage.create({
      sessionId: 'test-session',
      sender: 'user',
      text: 'Test message',
      user: user._id
    });
    
    console.log('Test message created:', message._id);
    
    // Create test order if doesn't exist
    const testOrder = await Order.findOne({ 'shippingAddress.address': 'Test Address' });
    const order = testOrder || await Order.create({
      user: user._id,
      orderItems: [{
        service: service._id,
        quantity: 1,
        price: service.price
      }],
      shippingAddress: {
        address: 'Test Address',
        city: 'Test City',
        postalCode: '123456',
        landmark: 'Test Landmark'
      },
      paymentMethod: 'cashOnDelivery',
      totalPrice: service.price
    });
    
    console.log('Test order created:', order._id);
    
    // Create test review if doesn't exist
    const testReview = await Review.findOne({ email: 'test@example.com' });
    const review = testReview || await Review.create({
      user: user._id,
      service: service._id,
      booking: booking._id,
      name: 'Test User',
      email: 'test@example.com',
      rating: 5,
      title: 'Excellent Service',
      comment: 'This is a test review comment. The service was excellent!',
      serviceType: 'Test Service',
      isVerified: true,
      isPublished: true
    });
    
    console.log('Test review created:', review._id);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nAvailable collections after initialization:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });

  } catch (error) {
    console.error('Database initialization error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run initialization if called directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
