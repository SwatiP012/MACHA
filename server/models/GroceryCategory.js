const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: 'GroceryCategory',
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('GroceryCategory', groceryCategorySchema);
