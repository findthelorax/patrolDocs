const mongoose = require('mongoose');
const CoordinatesSchema = require('../coordinates/coordinatesModel');

const LodgeSchema = new mongoose.Schema({
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    name: { type: String, required: true, unique: true },
    hours: { type: String },
    status: { type: String, required: true, enum: ['Open', 'Closed', 'Unknown'], default: 'Unknown'},
    equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }],
    coordinates: CoordinatesSchema,
});

LodgeSchema.index({ mountain:1, name: 1}, { unique: true });

const Lodge = mongoose.model('Lodge', LodgeSchema);

module.exports = { Lodge };