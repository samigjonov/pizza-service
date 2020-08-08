const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active'
    }
}, { timestamps: true });

exports.pizzaSchema = pizzaSchema;

exports.pizzaModel = mongoose.model('Pizza', pizzaSchema);
