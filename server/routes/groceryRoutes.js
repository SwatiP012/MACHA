const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate');
const adminGuard = require('../middleware/adminGuard');

// Import models
const GroceryProduct = mongoose.model('GroceryProduct');
const GroceryCategory = mongoose.model('GroceryCategory');
const GroceryOrder = mongoose.model('GroceryOrder');
const InventoryAdjustment = mongoose.model('InventoryAdjustment');

// ======== PUBLIC ROUTES ========

// Get all products with pagination and filtering
// ...existing code...
router.get('/products', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build query based on filters
        const query = { isActive: true };

        // Support both ?category= and ?categoryId=
        const categoryId = req.query.categoryId || req.query.category;

        if (categoryId) {
            query.categoryId = categoryId;
        }

        if (req.query.search) {
            query.$or = [
                { name: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        if (req.query.featured === 'true') {
            query.isFeatured = true;
        }

        // Execute query with pagination
        const products = await GroceryProduct.find(query)
            .populate('categoryId', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await GroceryProduct.countDocuments(query);

        res.json({
            products,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Get a single product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await GroceryProduct.findById(req.params.id)
            .populate('categoryId', 'name');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        try {
            const categories = await GroceryCategory.find({ isActive: true }).sort({ name: 1 });
            console.log('Fetched categories:', categories); // Add this
            res.json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ message: 'Server error' });
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single category with its products
router.get('/categories/:id', async (req, res) => {
    try {
        const category = await GroceryCategory.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const products = await GroceryProduct.find({
            categoryId: category._id,
            isActive: true
        });

        res.json({
            category,
            products
        });
    } catch (error) {
        console.error('Error fetching category details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ======== USER ROUTES (require authentication) ========

// Place a new order
// Place a new order (guest/anyone, e.g. for COD)
router.post('/orders', async (req, res) => {
    try {
        const {
            userId,
            name,
            contact,
            address,
            paymentMethod,
            timeSlot,
            deliveryInstructions,
            orderTotal,
            cartItems
        } = req.body;

        if (!name || !contact || !address || !paymentMethod || !cartItems || !cartItems.length) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Generate order number
        const orderCount = await GroceryOrder.countDocuments();
        const orderNumber = `GRO-${100000 + orderCount + 1}`;
        console.log('ORDER BODY:', req.body);

        // Prepare items for DB (ensure productId and quantity)
        const items = cartItems.map(item => ({
            productId: item._id || item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        // Create new order
        const newOrder = new GroceryOrder({
            userId,
            orderNumber,
            items,
            deliveryAddress: {
                name,
                phone: contact,
                address
            },
            paymentMethod: paymentMethod, // e.g. 'cod'
            deliveryNotes: deliveryInstructions,
            subtotal: orderTotal, // or calculate as needed
            total: orderTotal,
            status: 'pending',
            paymentStatus: (paymentMethod === 'cod') ? 'pending' : 'paid',
            timeSlot: timeSlot ? timeSlot.time : undefined
        });

        await newOrder.save();

        // Optionally update product stock here

        res.status(201).json({
            message: 'Order placed successfully',
            order: {
                id: newOrder._id,
                orderNumber: newOrder.orderNumber
            }
        });
    } catch (error) {
        console.error('Error creating guest order:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's orders
router.get('/user/orders', authenticate, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const orders = await GroceryOrder.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await GroceryOrder.countDocuments({ userId: req.user._id });

        res.json({
            orders,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get order details
router.get('/orders/:id', authenticate, async (req, res) => {
    try {
        const order = await GroceryOrder.findById(req.params.id)
            .populate('userId', 'name email phone')
            .populate('items.productId', 'name images'); // <-- add this


        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order belongs to the authenticated user or user is admin
        if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ======== ADMIN ROUTES ========

// Get all products (admin version with more details)
router.get('/admin/products', authenticate, adminGuard, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build query based on filters
        const query = {};

        if (req.query.category) {
            query.categoryId = req.query.category;
        }

        if (req.query.search) {
            query.$or = [
                { name: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } },
                { sku: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        if (req.query.status) {
            query.stockStatus = req.query.status;
        }

        // Execute query with pagination
        const products = await GroceryProduct.find(query)
            .populate('categoryId', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await GroceryProduct.countDocuments(query);

        res.json({
            products,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching admin products:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new product
router.post('/admin/products', authenticate, adminGuard, async (req, res) => {
    try {
        console.log('Received product data:', req.body);

        const {
            name,
            description,
            price,
            salePrice,
            costPrice,
            category, // Changed from categoryId
            stock,
            minStockLevel,
            maxStockLevel,
            sku,
            weight,
            images,
            isActive,
            isFeatured
        } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

        // Calculate stock status
        let stockStatus = 'in-stock';
        if (stock <= 0) {
            stockStatus = 'out-of-stock';
        } else if (minStockLevel && stock <= minStockLevel) {
            stockStatus = 'low-stock';
        } else if (maxStockLevel && stock >= maxStockLevel) {
            stockStatus = 'overstock';
        }

        // Find category ID or create a new category if needed
        let categoryId = null;
        let categoryName = '';
        if (category) {
            // Check if we have a category with this name
            const existingCategory = await mongoose.model('GroceryCategory').findOne({
                $or: [
                    { name: { $regex: new RegExp(`^${category}$`, 'i') } },
                    { _id: mongoose.Types.ObjectId.isValid(category) ? category : null }
                ]
            });

            if (existingCategory) {
                categoryId = existingCategory._id;
                categoryName = existingCategory.name;
            } else {
                // Create a new category
                const newCategory = new mongoose.model('GroceryCategory')({
                    name: category,
                    isActive: true
                });
                await newCategory.save();
                categoryId = newCategory._id;
                categoryName = newCategory.name; // <-- get the name
            }
        }

        // Create new product
        const newProduct = new mongoose.model('GroceryProduct')({
            name,
            description,
            price,
            salePrice,
            costPrice,
            categoryId,
            categoryName, // Now using the ObjectId we found or created
            stock: stock || 0,
            minStockLevel,
            maxStockLevel,
            stockStatus,
            sku,
            weight,
            images: images || [],
            isActive: isActive !== undefined ? isActive : true,
            isFeatured: isFeatured || false
        });

        console.log('Creating product:', newProduct);

        await newProduct.save();

        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});

// Update a product
router.put('/admin/products/:id', authenticate, adminGuard, async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;

        // Calculate stock status if stock is being updated
        if (updateData.stock !== undefined) {
            let stockStatus = 'in-stock';
            const stock = updateData.stock;
            const minStockLevel = updateData.minStockLevel || 0;
            const maxStockLevel = updateData.maxStockLevel || Infinity;

            if (stock <= 0) {
                stockStatus = 'out-of-stock';
            } else if (stock <= minStockLevel) {
                stockStatus = 'low-stock';
            } else if (stock >= maxStockLevel) {
                stockStatus = 'overstock';
            }

            updateData.stockStatus = stockStatus;
        }

        const updatedProduct = await GroceryProduct.findByIdAndUpdate(
            productId,
            updateData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a product
router.delete('/admin/products/:id', authenticate, adminGuard, async (req, res) => {
    try {
        const result = await GroceryProduct.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new category
router.post('/admin/categories/:id', authenticate, adminGuard, async (req, res) => {
    try {
        const { name, description, image, isActive } = req.body;
        console.log('REQ BODY:', req.body);

        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        // Create new category
        const newCategory = new GroceryCategory({
            name,
            description,
            image,
            isActive: isActive !== undefined ? isActive : true
        });

        await newCategory.save();

        res.status(201).json({
            message: 'Category created successfully',
            category: newCategory
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a category
router.put('/admin/categories/:id', authenticate, adminGuard, async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updateData = req.body;
        console.log('REQ BODY:', req.body);

        const updatedCategory = await GroceryCategory.findByIdAndUpdate(
            categoryId,
            updateData,
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({
            message: 'Category updated successfully',
            category: updatedCategory
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a category
router.delete('/admin/categories/:id', authenticate, adminGuard, async (req, res) => {
    try {
        const result = await GroceryCategory.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all orders (admin)
router.get('/admin/orders', authenticate, adminGuard, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build query based on filters
        const query = {};

        if (req.query.status) {
            query.status = req.query.status;
        }

        if (req.query.search) {
            query.$or = [
                { orderNumber: { $regex: req.query.search, $options: 'i' } },
                { 'deliveryAddress.name': { $regex: req.query.search, $options: 'i' } },
                { 'deliveryAddress.phone': { $regex: req.query.search, $options: 'i' } }
            ];
        }

        // Date range filtering
        if (req.query.fromDate && req.query.toDate) {
            query.createdAt = {
                $gte: new Date(req.query.fromDate),
                $lte: new Date(req.query.toDate)
            };
        } else if (req.query.fromDate) {
            query.createdAt = { $gte: new Date(req.query.fromDate) };
        } else if (req.query.toDate) {
            query.createdAt = { $lte: new Date(req.query.toDate) };
        }

        // Sort options
        let sortOption = { createdAt: -1 }; // Default sort by date descending

        if (req.query.sortBy && req.query.sortDirection) {
            if (req.query.sortBy === 'date') {
                sortOption = { createdAt: req.query.sortDirection === 'asc' ? 1 : -1 };
            } else if (req.query.sortBy === 'total') {
                sortOption = { total: req.query.sortDirection === 'asc' ? 1 : -1 };
            } else if (req.query.sortBy === 'customer') {
                sortOption = { 'deliveryAddress.name': req.query.sortDirection === 'asc' ? 1 : -1 };
            }
        }

        // Execute query with pagination
        const orders = await GroceryOrder.find(query)
            .populate('userId', 'name email phone')
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        const total = await GroceryOrder.countDocuments(query);

        res.json({
            orders,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching admin orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update order status
router.patch('/admin/orders/:id/status', authenticate, adminGuard, async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const validStatuses = ['pending', 'processing', 'out-for-delivery', 'delivered', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const updatedOrder = await GroceryOrder.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({
            message: 'Order status updated successfully',
            order: updatedOrder
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Inventory adjustment
router.post('/admin/inventory/adjust', authenticate, adminGuard, async (req, res) => {
    try {
        const { productId, adjustmentType, quantity, reason, notes } = req.body;

        if (!productId || !adjustmentType || !quantity || !reason) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const product = await GroceryProduct.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Calculate new stock
        let newStock = product.stock;

        if (adjustmentType === 'add') {
            newStock += parseInt(quantity);
        } else if (adjustmentType === 'remove') {
            newStock -= parseInt(quantity);

            if (newStock < 0) {
                return res.status(400).json({ message: 'Cannot remove more than available stock' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid adjustment type' });
        }

        // Determine stock status
        let stockStatus = 'in-stock';
        if (newStock <= 0) {
            stockStatus = 'out-of-stock';
        } else if (product.minStockLevel && newStock <= product.minStockLevel) {
            stockStatus = 'low-stock';
        } else if (product.maxStockLevel && newStock >= product.maxStockLevel) {
            stockStatus = 'overstock';
        }

        // Create inventory adjustment record
        const adjustment = new InventoryAdjustment({
            productId,
            adjustmentType,
            quantity: parseInt(quantity),
            previousStock: product.stock,
            newStock,
            reason,
            notes,
            adjustedBy: req.user._id
        });

        // Update product stock
        product.stock = newStock;
        product.stockStatus = stockStatus;
        product.lastUpdated = new Date();

        // Save both documents
        await Promise.all([
            adjustment.save(),
            product.save()
        ]);

        res.json({
            message: 'Inventory adjusted successfully',
            adjustment,
            product: {
                id: product._id,
                name: product.name,
                newStock,
                stockStatus
            }
        });
    } catch (error) {
        console.error('Error adjusting inventory:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get inventory summary
router.get('/admin/inventory/summary', authenticate, adminGuard, async (req, res) => {
    try {
        // Get total products count
        const totalItems = await GroceryProduct.countDocuments();

        // Get low stock items
        const lowStockItems = await GroceryProduct.countDocuments({ stockStatus: 'low-stock' });

        // Get out of stock items
        const outOfStockItems = await GroceryProduct.countDocuments({ stockStatus: 'out-of-stock' });

        // Get overstocked items
        const overStockedItems = await GroceryProduct.countDocuments({ stockStatus: 'overstock' });

        res.json({
            totalItems,
            lowStockItems,
            outOfStockItems,
            overStockedItems
        });
    } catch (error) {
        console.error('Error fetching inventory summary:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get inventory adjustment history
router.get('/admin/inventory/history', authenticate, adminGuard, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build query
        const query = {};

        if (req.query.productId) {
            query.productId = req.query.productId;
        }

        if (req.query.adjustmentType) {
            query.adjustmentType = req.query.adjustmentType;
        }

        // Date range filtering
        if (req.query.fromDate && req.query.toDate) {
            query.createdAt = {
                $gte: new Date(req.query.fromDate),
                $lte: new Date(req.query.toDate)
            };
        } else if (req.query.fromDate) {
            query.createdAt = { $gte: new Date(req.query.fromDate) };
        } else if (req.query.toDate) {
            query.createdAt = { $lte: new Date(req.query.toDate) };
        }

        const adjustments = await InventoryAdjustment.find(query)
            .populate('productId', 'name sku')
            .populate('adjustedBy', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await InventoryAdjustment.countDocuments(query);

        res.json({
            adjustments,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching inventory history:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Export inventory as CSV
router.get('/admin/inventory/export', authenticate, adminGuard, async (req, res) => {
    try {
        const products = await GroceryProduct.find()
            .populate('categoryId', 'name');

        // Create CSV content
        let csv = 'ID,SKU,Name,Category,Stock,Min Stock,Max Stock,Status,Price,Cost Price,Location\n';

        products.forEach(product => {
            csv += `${product._id},${product.sku || ''},"${product.name}","${product.categoryId ? product.categoryId.name : 'Uncategorized'}",${product.stock},${product.minStockLevel || 0},${product.maxStockLevel || 0},${product.stockStatus},${product.price},${product.costPrice || 0},"${product.location || 'Main Warehouse'}"\n`;
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=inventory.csv');
        res.status(200).send(csv);
    } catch (error) {
        console.error('Error exporting inventory:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get sales analytics
router.get('/admin/analytics/sales', authenticate, adminGuard, async (req, res) => {
    try {
        const period = req.query.period || '7days';
        let startDate;

        // Determine start date based on period
        const now = new Date();

        switch (period) {
            case '7days':
                startDate = new Date(now.setDate(now.getDate() - 7));
                break;
            case '30days':
                startDate = new Date(now.setDate(now.getDate() - 30));
                break;
            case '90days':
                startDate = new Date(now.setDate(now.getDate() - 90));
                break;
            default:
                startDate = new Date(now.setDate(now.getDate() - 7));
        }

        // Calculate sales summary
        const summary = await GroceryOrder.aggregate([
            { $match: { createdAt: { $gte: startDate }, status: { $ne: 'cancelled' } } },
            {
                $group: {
                    _id: null,
                    orders: { $sum: 1 },
                    sales: { $sum: '$total' }
                }
            }
        ]);

        // Calculate sales over time (by day)
        const salesOverTime = await GroceryOrder.aggregate([
            { $match: { createdAt: { $gte: startDate }, status: { $ne: 'cancelled' } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    sales: { $sum: '$total' },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    date: '$_id',
                    sales: 1,
                    orders: 1,
                    _id: 0
                }
            }
        ]);

        res.json({
            summary: {
                orders: summary.length > 0 ? summary[0].orders : 0,
                sales: summary.length > 0 ? summary[0].sales : 0
            },
            salesOverTime
        });
    } catch (error) {
        console.error('Error fetching sales analytics:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get top products
router.get('/admin/analytics/top-products', authenticate, adminGuard, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;

        // This requires a more complex query to calculate products from order items
        const topProducts = await GroceryOrder.aggregate([
            { $match: { status: { $ne: 'cancelled' } } },
            { $unwind: '$items' },
            {
                $group: {
                    _id: '$items.productId',
                    totalSales: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                    totalQuantity: { $sum: '$items.quantity' },
                    orderCount: { $sum: 1 }
                }
            },
            { $sort: { totalSales: -1 } },
            { $limit: limit },
            {
                $lookup: {
                    from: 'groceryproducts',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            {
                $project: {
                    _id: 1,
                    name: '$product.name',
                    totalSales: 1,
                    totalQuantity: 1,
                    orderCount: 1,
                    price: '$product.price',
                    image: { $arrayElemAt: ['$product.images', 0] }
                }
            }
        ]);

        res.json(topProducts);
    } catch (error) {
        console.error('Error fetching top products:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get sales by category
router.get('/admin/analytics/sales-by-category', authenticate, adminGuard, async (req, res) => {
    try {
        // This requires joining orders with products and categories
        const salesByCategory = await GroceryOrder.aggregate([
            { $match: { status: { $ne: 'cancelled' } } },
            { $unwind: '$items' },
            {
                $lookup: {
                    from: 'groceryproducts',
                    localField: 'items.productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            {
                $lookup: {
                    from: 'grocerycategories',
                    localField: 'product.categoryId',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
            {
                $group: {
                    _id: '$category._id',
                    categoryName: { $first: '$category.name' },
                    totalSales: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                    itemCount: { $sum: '$items.quantity' }
                }
            },
            { $sort: { totalSales: -1 } },
            {
                $project: {
                    _id: 1,
                    name: { $ifNull: ['$categoryName', 'Uncategorized'] },
                    totalSales: 1,
                    itemCount: 1
                }
            }
        ]);

        res.json(salesByCategory);
    } catch (error) {
        console.error('Error fetching sales by category:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
