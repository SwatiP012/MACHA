const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate');
const User = mongoose.model('User');

// GET user profile
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -googleId');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user profile',
            error: error.message
        });
    }
});

// GET user addresses
router.get('/addresses', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('addresses defaultAddress');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            addresses: user.addresses || [],
            defaultAddress: user.defaultAddress
        });
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch addresses',
            error: error.message
        });
    }
});

// POST to add a new address
router.post('/addresses', authenticate, async (req, res) => {
    try {
        const {
            addressType,
            addressLine1,
            addressLine2,
            city,
            state,
            pincode,
            landmark,
            isDefault
        } = req.body;

        // Basic validation
        if (!addressLine1 || !city || !state || !pincode) {
            return res.status(400).json({
                success: false,
                message: 'Missing required address information'
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Create a new address object with an ID
        const newAddress = {
            _id: new mongoose.Types.ObjectId(),
            addressType: addressType || 'Home',
            addressLine1,
            addressLine2: addressLine2 || '',
            city,
            state,
            pincode,
            landmark: landmark || '',
            isDefault: isDefault || false
        };

        // Initialize addresses array if it doesn't exist
        if (!user.addresses) {
            user.addresses = [];
        }

        // Add the new address
        user.addresses.push(newAddress);

        // Handle default address
        if (isDefault || user.addresses.length === 1) {
            user.defaultAddress = newAddress._id;
        }

        await user.save();

        res.status(201).json({
            success: true,
            message: 'Address added successfully',
            address: newAddress,
            addresses: user.addresses,
            defaultAddress: user.defaultAddress
        });
    } catch (error) {
        console.error('Error adding address:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add address',
            error: error.message
        });
    }
});

// PUT to update an address
router.put('/addresses/:id', authenticate, async (req, res) => {
    try {
        const addressId = req.params.id;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Find the address in user's addresses array
        const addressIndex = user.addresses.findIndex(
            address => address._id.toString() === addressId
        );

        if (addressIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        // Update the address fields
        Object.keys(req.body).forEach(key => {
            if (key !== '_id' && key !== 'isDefault') {
                user.addresses[addressIndex][key] = req.body[key];
            }
        });

        // Handle default address
        if (req.body.isDefault) {
            user.defaultAddress = addressId;
        }

        await user.save();

        res.json({
            success: true,
            message: 'Address updated successfully',
            address: user.addresses[addressIndex],
            addresses: user.addresses,
            defaultAddress: user.defaultAddress
        });
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update address',
            error: error.message
        });
    }
});

// DELETE an address
router.delete('/addresses/:id', authenticate, async (req, res) => {
    try {
        const addressId = req.params.id;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the address exists
        const addressIndex = user.addresses.findIndex(
            address => address._id.toString() === addressId
        );

        if (addressIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        // Remove the address
        user.addresses.splice(addressIndex, 1);

        // Update default address if needed
        if (user.defaultAddress && user.defaultAddress.toString() === addressId) {
            user.defaultAddress = user.addresses.length > 0 ? user.addresses[0]._id : null;
        }

        await user.save();

        res.json({
            success: true,
            message: 'Address deleted successfully',
            addresses: user.addresses,
            defaultAddress: user.defaultAddress
        });
    } catch (error) {
        console.error('Error deleting address:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete address',
            error: error.message
        });
    }
});

// Set default address
router.patch('/addresses/:id/setDefault', authenticate, async (req, res) => {
    try {
        const addressId = req.params.id;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the address exists
        const addressExists = user.addresses.some(
            address => address._id.toString() === addressId
        );

        if (!addressExists) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        // Set as default address
        user.defaultAddress = addressId;
        await user.save();

        res.json({
            success: true,
            message: 'Default address updated',
            defaultAddress: user.defaultAddress
        });
    } catch (error) {
        console.error('Error setting default address:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to set default address',
            error: error.message
        });
    }
});

module.exports = router;
