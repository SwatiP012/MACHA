const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    sku: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    barcode: {
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
        ref: 'GroceryCategory',
        required: true
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
        default: 10,
        min: 0
    },
    maxStockLevel: {
        type: Number,
        default: 100,
        min: 0
    },
    stockStatus: {
        type: String,
        enum: ['in-stock', 'low-stock', 'out-of-stock', 'overstock'],
        default: 'in-stock'
    },
    images: [String],
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    tax: {
        type: Number,
        default: 0,
        min: 0
    },
    weight: {
        type: Number,
        min: 0
    },
    unit: {
        type: String,
        enum: ['g', 'kg', 'ml', 'l', 'piece', 'pack'],
        default: 'piece'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    tags: [String],
    attributes: [{
        name: String,
        value: String
    }],
    location: {
        type: String,
        default: 'Main Warehouse'
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Update stock status based on stock levels
groceryProductSchema.pre('save', function (next) {
    if (this.stock <= 0) {
        this.stockStatus = 'out-of-stock';
    } else if (this.stock < this.minStockLevel) {
        this.stockStatus = 'low-stock';
    } else if (this.stock > this.maxStockLevel) {
        this.stockStatus = 'overstock';
    } else {
        this.stockStatus = 'in-stock';
    }
    this.lastUpdated = new Date();
    next();
});

module.exports = mongoose.model('GroceryProduct', groceryProductSchema);
