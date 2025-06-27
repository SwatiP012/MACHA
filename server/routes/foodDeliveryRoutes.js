const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate');
const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');


// GET all restaurants
router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ isActive: true })
            .select('name description cuisine address imageUrl rating deliveryTime deliveryFee minimumOrder');

        res.json({ success: true, restaurants });
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch restaurants',
            error: error.message
        });
    }
});

// GET a single restaurant by ID
router.get('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }

        res.json({ success: true, restaurant });
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch restaurant details',
            error: error.message
        });
    }
});

// GET menu items for a restaurant
router.get('/restaurants/:id/menu', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }

        res.json({
            success: true,
            menuItems: restaurant.menu || []
        });
    } catch (error) {
        console.error('Error fetching menu:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch menu items',
            error: error.message
        });
    }
});

// POST to create a new order
router.post('/orders', authenticate, async (req, res) => {
    try {
        const { restaurantId, items, deliveryAddress, paymentMethod, specialInstructions, subTotal, deliveryFee, total } = req.body;

        // Basic validation
        if (
            !restaurantId ||
            !items || !Array.isArray(items) || !items.length ||
            !deliveryAddress ||
            !deliveryAddress.addressLine1 ||
            !deliveryAddress.city ||
            !deliveryAddress.state ||
            !deliveryAddress.pincode ||
            typeof subTotal !== 'number' ||
            typeof deliveryFee !== 'number' ||
            typeof total !== 'number' ||
            !paymentMethod
        ) {
            return res.status(400).json({
                success: false,
                message: 'Missing or invalid required order information'
            });
        }

        // Find restaurant
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }

        // Create Order (assuming you have an Order model)
        const order = new Order({
            userId: req.user._id,
            restaurantId,
            restaurantName: restaurant.name,
            items,
            subTotal,
            deliveryFee,
            total,
            deliveryAddress,
            paymentMethod,
            specialInstructions,
            status: 'pending'
        });

        await order.save();
        
        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error.message
        });
    }
});

// GET user's orders
router.get('/orders', authenticate, async (req, res) => {
    try {
        const Order = mongoose.model('Order');
        const orders = await Order.find({ userId: req.user._id })
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders',
            error: error.message
        });
    }
});

// GET a specific order
router.get('/orders/:id', authenticate, async (req, res) => {
    try {
        const Order = mongoose.model('Order');
        const order = await Order.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({ success: true, order });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch order details',
            error: error.message
        });
    }
});

module.exports = router;
