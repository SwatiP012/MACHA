const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Restaurant = require('../models/Restaurant');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');

// Open registration: anyone can register a restaurant
router.post('/register', async (req, res) => {
    try {
        const {
            name,
            description,
            cuisine,
            address,
            imageUrl,
            deliveryTime,
            deliveryFee,
            minimumOrder,
            openingHours,
            ownerName,
            ownerEmail,
            ownerPhone,
            ownerPassword
        } = req.body;

        // Basic validation
        if (!name || !address || !ownerName || !ownerEmail || !ownerPhone || !ownerPassword) {
            return res.status(400).json({ message: 'All required fields must be filled' });
        }

        // Optional: Check if restaurant with same ownerEmail already exists
        const existing = await Restaurant.findOne({ 'owner.email': ownerEmail });
        if (existing) {
            return res.status(400).json({ message: 'Owner email already registered' });
        }

        const hashedPassword = await bcrypt.hash(ownerPassword, 10);

        const restaurant = new Restaurant({
            name,
            description,
            cuisine,
            address,
            imageUrl,
            deliveryTime,
            deliveryFee,
            minimumOrder,
            openingHours,
            owner: {
                name: ownerName,
                email: ownerEmail,
                phone: ownerPhone,
                password: hashedPassword
            },
            isActive: true
        });

        await restaurant.save();
        res.status(201).json({ message: 'Restaurant registered successfully', restaurant });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST /api/restaurants/login
// ...existing code...
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const restaurant = await Restaurant.findOne({ 'owner.email': email });
    if (!restaurant) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, restaurant.owner.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Use _id in JWT payload for consistency
    const token = jwt.sign(
        { _id: restaurant._id, email: restaurant.owner.email, role: 'restaurant' },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1d' }
    );

    res.json({
        message: 'Login successful',
        token,
        restaurantId: restaurant._id
    });
});
// ...existing code...

// Get all restaurants (public)
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ isActive: true })
            .select('name description cuisine address.city imageUrl rating deliveryTime deliveryFee');
        res.json({ success: true, restaurants });
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch restaurants' });
    }
});

// IMPORTANT: Route for user restaurants needs to be BEFORE the /:id route
// GET /api/restaurants/user - Get restaurants for the logged-in user
router.get('/user', authenticate, async (req, res) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        // Find all restaurants owned by this user (by owner email)
        const restaurants = await Restaurant.find({ 'owner.email': req.user.email })
            .select('name description cuisine address imageUrl rating deliveryTime deliveryFee');

        res.json({ success: true, restaurants });
    } catch (error) {
        console.error('Error fetching user restaurants:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user restaurants',
            error: error.message
        });
    }
});
// GET /api/restaurants/owner/:email
router.get('/owner/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const restaurants = await Restaurant.find({ 'owner.email': email });
        if (!restaurants || restaurants.length === 0) {
            return res.status(404).json({ success: false, message: 'No restaurants found for this owner' });
        }
        res.json({ success: true, restaurants });
    } catch (error) {
        console.error('Error fetching owner restaurants:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch owner restaurants' });
    }
});

// IMPORTANT: This route must come AFTER the /user route
// Get a specific restaurant by ID
router.get('/:id', async (req, res) => {
    try {
        // Validate that id is a valid ObjectId to avoid the casting error
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid restaurant ID format'
            });
        }

        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        res.json({ success: true, restaurant });
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch restaurant details' });
    }
});

// Add a menu item to a restaurant
router.post('/:id/menu', authenticate, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        // Only allow the owner to add menu items
        if (req.user.role === 'restaurant' && restaurant._id.toString() !== req.user._id) {
            return res.status(403).json({ success: false, message: 'Not authorized to modify this restaurant' });
        }
        restaurant.menu.push(req.body);
        await restaurant.save();
        res.status(201).json({ success: true, menuItem: restaurant.menu[restaurant.menu.length - 1] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add menu item', error: error.message });
    }
});

// Edit a menu item
router.put('/:id/menu/:menuItemId', authenticate, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        // Only allow the owner to edit menu items
        if (req.user.role === 'restaurant' && restaurant._id.toString() !== req.user._id) {
            return res.status(403).json({ success: false, message: 'Not authorized to modify this restaurant' });
        }
        const menuItem = restaurant.menu.id(req.params.menuItemId);
        if (!menuItem) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        // Update fields
        Object.assign(menuItem, req.body);
        await restaurant.save();
        res.json({ success: true, menuItem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update menu item', error: error.message });
    }
});

// Delete a menu item
router.delete('/:id/menu/:menuItemId', authenticate, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        // Only allow the owner to delete menu items
        if (req.user.role === 'restaurant' && restaurant._id.toString() !== req.user._id) {
            return res.status(403).json({ success: false, message: 'Not authorized to modify this restaurant' });
        }
        const menuItem = restaurant.menu.id(req.params.menuItemId);
        if (!menuItem) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        menuItem.remove();
        await restaurant.save();
        res.json({ success: true, message: 'Menu item deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete menu item', error: error.message });
    }
});

// Get restaurant menu items (public)
router.get('/:id/menu', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        res.json({ success: true, menuItems: restaurant.menu || [] });
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch menu items' });
    }
});

// Get a specific menu item (public)
router.get('/:id/menu/:menuItemId', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        const menuItem = restaurant.menu.id(req.params.menuItemId);
        if (!menuItem) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        res.json({ success: true, menuItem });
    } catch (error) {
        console.error('Error fetching menu item:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch menu item' });
    }
});

// ...existing code...
router.get('/:id/orders', authenticate, async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ success: false, message: 'Invalid restaurant ID format' });
        }
        // Only allow the owner to view orders
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        if (req.user.role === 'restaurant' && restaurant._id.toString() !== req.user._id) {
            return res.status(403).json({ success: false, message: 'Not authorized to view orders for this restaurant' });
        }
        // Fetch orders for this restaurant and populate userId with name and email
        const orders = await Order.find({ restaurantId: restaurantId })
            .populate('userId', 'name email') // <-- Add this line
            .sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching restaurant orders:', error);
        res.status(500).json({
            success: false, message: 'Failed to fetch restaurant orders', error: error.message
        });
    }
});

router.patch('/:orderId/confirm', authenticate, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

        // Optionally: Check if the user is allowed to confirm this order

        order.status = 'confirmed';
        await order.save();
        res.json({ success: true, order });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to confirm order' });
    }
});

// Example Express route

// ...existing code...

// The following endpoints still require authentication and owner checks
// You can update them to use the new owner object if you implement owner login in the future

module.exports = router;