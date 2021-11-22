const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: String,
    order: [{
        id: Number,
        name: String,
        price: String,
        quantity: Number,
        hotel: String,
    }]
});

module.exports = mongoose.model('cart', cartSchema, 'cart');