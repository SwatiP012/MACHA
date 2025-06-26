const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    reason: {
        type: String,
        required: true,
        enum: ['new_stock', 'return', 'sale', 'damage', 'expiry', 'correction', 'other']
    },
    notes: String,
    performedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stockBefore: {
        type: Number,
        required: true
    },
    stockAfter: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('InventoryAdjustment', inventoryAdjustmentSchema);
