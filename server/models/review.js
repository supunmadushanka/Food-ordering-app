const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    hotelId: String,
    userId: String,
    userName: String,
    review: String
});

module.exports = mongoose.model('review', reviewSchema, 'reviews');
