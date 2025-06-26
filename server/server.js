require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const url = require('url');
const { initializeWebSocketServer } = require('./websocket/index'); // adjust path if needed


require('./models');

const app = express();
// Function to safely import routes (with error handling)
function safeRequire(path, fallback = null) {
  try {
    return require(path);
  } catch (error) {
    console.warn(`Warning: Could not load module "${path}". Using fallback.`);
    return fallback || ((req, res) => {
      res.status(501).json({ message: 'This functionality is not yet implemented' });
    });
  }
}

// Function to start the server
function startServer() {
  // Initialize express app
  const app = express();
  const server = http.createServer(app);

  // Configure mongoose
  mongoose.set('strictQuery', false);

  // Middleware
  app.use(cors({
    origin: [
      'http://localhost:5173',
      'https://swatip012.github.io',
    ],
    credentials: true
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Debug middleware to log all requests
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Connect to MongoDB
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/macha-app';
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('MongoDB Connected:', mongoose.connection.host);
      console.log('Database Name:', mongoose.connection.name);

      // Log available models
      console.log('Initializing MongoDB models...');
      Object.keys(mongoose.models).forEach(modelName => {
        console.log(`- ${modelName} (Collection: ${mongoose.models[modelName].collection.name})`);
      });

      console.log('MongoDB connected successfully');
    })
    .catch(err => console.error('MongoDB connection error:', err));

  // Initialize WebSocket server on /ws
  initializeWebSocketServer(server);

  // Create a basic health route for all environments
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      server: 'MACHA API',
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // API Routes - safely import
  const authRoutes = safeRequire('./routes/auth', express.Router());
  const userRoutes = safeRequire('./routes/user', express.Router());
  const bookingRoutes = safeRequire('./routes/bookingRoutes', express.Router());
  const serviceRoutes = safeRequire('./routes/serviceRoutes', express.Router());
  const adminRoutes = safeRequire('./routes/adminRoutes', express.Router());
  const healthRoutes = safeRequire('./routes/health', express.Router());
  const restaurantRoutes = require('./routes/restaurantRoutes');
  const foodDeliveryRoutes = require('./routes/foodDeliveryRoutes');
  const analyticsRoutes = require('./routes/analyticsRoutes');
  const groceryRoutes = require('./routes/groceryRoutes');

  // Mount routes with error handling
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/restaurants', restaurantRoutes);
  app.use('/api/food-delivery', foodDeliveryRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/analytics', analyticsRoutes);
  app.use('/api/grocery', groceryRoutes); 
  app.use('/api/services', serviceRoutes);
  app.use('/api/health', healthRoutes);


  // Root endpoint for API check
  app.get('/api', (req, res) => {
    res.json({
      message: 'Welcome to MACHA API',
      version: '1.0.0',
      endpoints: [
        '/api/auth',
        '/api/users',
        '/api/bookings',
        '/api/services',
        '/api/admin',
        '/api/health'
      ],
      status: 'online',
      timestamp: new Date().toISOString()
    });
  });

  // Serve static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
    });
  }

  // Error handler
  app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: process.env.NODE_ENV === 'production' ? 'Server error' : err.message
    });
  });

  // Start server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`WebSocket server available at ws://localhost:${PORT}/ws`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
  });

  return server;
}

// Export the function to start the server
module.exports = { startServer };