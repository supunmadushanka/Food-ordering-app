const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const driverSchema = new Schema({
    email: String,
    name: String,
    address: String,
});

module.exports = mongoose.model('driver', driverSchema, 'drivers');