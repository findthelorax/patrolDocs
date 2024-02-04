const mongoose = require('mongoose');
const Conditions = require('../helpers/conditions');
const CoordinatesSchema = require('../coordinates/coordinatesModel');

const TrailLogSchema = new mongoose.Schema({
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    trail: { type: mongoose.Schema.Types.ObjectId, ref: 'Trail', required: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    date: { type: Date, default: Date.now, index: true },
    status: { type: Boolean, default: false },
    patrollers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patroller' }],
    condition: { type: String, enum: Object.values(Conditions) },
    comments: String,
});

const TrailSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    difficulty: { type: String, enum: ['green', 'blue', 'black', 'double black'] },
    type: { type: String, enum: ['glades', 'moguls', 'natural', 'race', 'park', 'groomed'] },
    status: { type: String, required: true, enum: ['open', 'closed', 'unknown'], default: 'unknown'},
    trailLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrailLog' }],
    coordinates: CoordinatesSchema,
});

TrailSchema.index({ mountain:1, name: 1, difficulty: 1 }, { unique: true });

const Trail = mongoose.model('Trail', TrailSchema);
const TrailLog = mongoose.model('TrailLog', TrailLogSchema);

module.exports = { Trail, TrailLog};