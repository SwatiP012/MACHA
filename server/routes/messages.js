const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock messages for testing
const messages = [
  {
    text: "Welcome to MACHA! How can I help you today?",
    sender: 'admin',
    userId: 'admin',
    name: 'MACHA Support',
    timestamp: new Date().toISOString(),
    read: true
  }
];

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Get all messages for a user
router.get('/', authenticate, async (req, res) => {
  try {
    // In a real app, you would filter messages from the database
    // For now, return all mock messages
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark messages as read
router.put('/mark-read', authenticate, async (req, res) => {
  try {
    const { messageIds } = req.body;
    
    if (!messageIds || !Array.isArray(messageIds)) {
      return res.status(400).json({ message: 'Invalid message IDs' });
    }
    
    // In a real app, you would update the database
    // For now, just set the mock messages as read
    messageIds.forEach(id => {
      const message = messages.find(m => m._id === id);
      if (message) {
        message.read = true;
      }
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
