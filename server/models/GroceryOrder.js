const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groceryOrderItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'GroceryProduct',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    discount: {
        type: Number,
        default: 0,
        min: 0
    },
    total: {
        type: Number,
        required: true,
        min: 0
    }
});

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
    items: [groceryOrderItemSchema],
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    deliveryFee: {
        type: Number,
        default: 0,
        min: 0
    },
    discount: {
        type: Number,
        default: 0,
        min: 0
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    deliveryAddress: {
        fullName: String,
        phone: String,
        street: String,
        area: String,
        landmark: String,
        city: String,
        state: String,
        pincode: String,
        type: {
            type: String,
            enum: ['home', 'work', 'other'],
            default: 'home'
        }
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'cash', 'cash-on-delivery', 'card', 'upi'], // add 'cod' if you want to allow it
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'out-for-delivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    deliveryNotes: String,
    deliveredAt: Date,
    cancelReason: String
}, { timestamps: true });

// Generate order number before saving
groceryOrderSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    const count = await this.constructor.countDocuments();
    this.orderNumber = `GRO-${Date.now().toString().slice(-6)}${(count + 1).toString().padStart(4, '0')}`;
    next();
});

module.exports = mongoose.model('GroceryOrder', groceryOrderSchema);
