const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rateSchema = new Schema({
    eur: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Rate', rateSchema);
