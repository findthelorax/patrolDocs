const mongoose = require('mongoose');

const CoordinatesSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: function() { return this.coordinates != null; }
    },
    lng: {
        type: Number,
        required: function() { return this.coordinates != null; }
    },
}, { _id: false });

module.exports = CoordinatesSchema;