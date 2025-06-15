const express = require('express');
const router = express.Router();

// Basic health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    server: 'MACHA API',
    environment: process.env.NODE_ENV || 'development'
  });
});

module.exports = router;
