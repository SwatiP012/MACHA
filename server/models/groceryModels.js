const mongoose = require('mongoose');
const { Schema } = mongoose;

// GroceryCategory Schema
const groceryCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// GroceryProduct Schema
const groceryProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    salePrice: {
        type: Number,
        min: 0
    },
    costPrice: {
        type: Number,
        min: 0
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'GroceryCategory'
    },
    categoryName: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    minStockLevel: {
        type: Number,
        min: 0
    },
    maxStockLevel: {
        type: Number,
        min: 0
    },
    stockStatus: {
        type: String,
        enum: ['in-stock', 'low-stock', 'out-of-stock', 'overstock'],
        default: 'in-stock'
    },
    sku: {
        type: String,
        trim: true
    },
    barcode: {
        type: String,
        trim: true
    },
    weight: {
        type: Number,
        min: 0
    },
    images: [String],
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        default: 'Main Warehouse'
    },
    lastUpdated: {
        type: Date
    }
}, { timestamps: true });

// GroceryOrder Schema
const groceryOrderSchema = new Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'GroceryProduct',
            required: true
        },
        name: String,
        price: Number,
        quantity: Number
    }],
    deliveryAddress: {
        name: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        pincode: String
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'cash', 'cash-on-delivery', 'card', 'upi'], // add 'cod' if you want to allow it
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    deliveryNotes: String,
    subtotal: Number,
    deliveryFee: Number,
    discount: {
        type: Number,
        default: 0
    },
    total: Number,
    status: {
        type: String,
        enum: ['pending', 'processing', 'out-for-delivery', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

// Inventory Adjustment Schema
const inventoryAdjustmentSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'GroceryProduct',
        required: true
    },
    adjustmentType: {
        type: String,
        enum: ['add', 'remove'],
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    previousStock: {
        type: Number,
        required: true
    },
    newStock: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    notes: String,
    adjustedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// Register models
mongoose.model('GroceryCategory', groceryCategorySchema);
mongoose.model('GroceryProduct', groceryProductSchema);
mongoose.model('GroceryOrder', groceryOrderSchema);
mongoose.model('InventoryAdjustment', inventoryAdjustmentSchema);
