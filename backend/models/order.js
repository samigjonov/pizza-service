const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const { pizzaSchema } = require('./pizza');

const orderSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    items: [{item: pizzaSchema, quantity: Number}],
    totalPrice: {
        type: Map,
        of: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
