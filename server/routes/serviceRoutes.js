const express = require('express');
const router = express.Router();

// Get all available services
router.get('/', (req, res) => {
  try {
    // Mock data for services
    const services = [
      { 
        id: '1',
        name: 'Food Delivery',
        description: 'Get food delivered from local restaurants',
        image: 'https://example.com/food.jpg',
        basePrice: 50
      },
      { 
        id: '2',
        name: 'Grocery Delivery',
        description: 'Get groceries delivered to your doorstep',
        image: 'https://example.com/grocery.jpg',
        basePrice: 40
      },
      {
        id: '3',
        name: 'Electrician',
        description: 'Professional electrical repair services',
        image: 'https://example.com/electrician.jpg',
        basePrice: 300
      },
      {
        id: '4',
        name: 'Plumber',
        description: 'Professional plumbing services',
        image: 'https://example.com/plumber.jpg',
        basePrice: 350
      }
    ];
    
    res.json({ success: true, services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get service by ID
router.get('/:id', (req, res) => {
  try {
    // Mock service data
    const service = { 
      id: req.params.id,
      name: 'Food Delivery',
      description: 'Get food delivered from local restaurants',
      image: 'https://example.com/food.jpg',
      basePrice: 50,
      availableTimings: ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM']
    };
    
    res.json({ success: true, service });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
