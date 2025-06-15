// This is the main entry point for the server

// Import required modules
require('dotenv').config();
const { startServer } = require('./server/server');
const mongoose = require('mongoose'); // Add this import

console.log('Starting MACHA API server...');
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);

// Import all models to ensure they're registered with mongoose
require('./server/models');

// Start the server
try {
  const server = startServer();
  console.log('Server started successfully!');
  console.log('Make sure your MongoDB is running!');
  console.log('Use Ctrl+C to stop the server');
  
  // Export server for testing purposes
  module.exports = server;
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}

// Add a debug function to log available models
function logRegisteredModels() {
  console.log('Registered Mongoose models:');
  Object.keys(mongoose.models).forEach(modelName => {
    console.log(` - ${modelName}`);
  });
}

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/macha-app';
mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('MongoDB Connected:', mongoose.connection.host);
  console.log('Database Name:', mongoose.connection.name);
  
  // Log registered models
  logRegisteredModels();
  
  console.log('MongoDB connected successfully');
})
.catch(err => console.error('MongoDB connection error:', err));