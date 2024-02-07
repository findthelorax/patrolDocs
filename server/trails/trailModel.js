const mongoose = require('mongoose');
const Conditions = require('../helpers/conditions');
const CoordinatesSchema = require('../coordinates/coordinatesModel');

const TrailLogSchema = new mongoose.Schema({
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    trail: { type: mongoose.Schema.Types.ObjectId, ref: 'Trail', required: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    date: { type: Date, default: Date.now, index: true },
    status: { type: String, required: true, enum: ['Open', 'Closed', 'Unknown'], default: 'Unknown'},
    openingPatroller: { type: mongoose.Schema.Types.ObjectId, ref: 'Patroller' },
    closingPatroller: { type: mongoose.Schema.Types.ObjectId, ref: 'Patroller' },
    condition: { type: String, enum: Object.values(Conditions) },
    comments: String,
});

const TrailSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    difficulty: { type: String, enum: ['Green', 'Blue', 'Black', 'Double Black'] },
    type: { type: String, enum: ['Glades', 'Moguls', 'Natural', 'Race', 'Park', 'Groomed'] },
    status: { type: String, required: true, enum: ['Open', 'Closed', 'Unknown'], default: 'Unknown'},
    trailLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrailLog' }],
    coordinates: CoordinatesSchema,
});

TrailSchema.index({ mountain:1, name: 1, difficulty: 1 }, { unique: true });

const Trail = mongoose.model('Trail', TrailSchema);
const TrailLog = mongoose.model('TrailLog', TrailLogSchema);

module.exports = { Trail, TrailLog};