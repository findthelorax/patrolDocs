const mongoose = require('mongoose');
const Conditions = require('../helpers/conditions');

const TrailLogSchema = new mongoose.Schema({
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    trail: { type: mongoose.Schema.Types.ObjectId, ref: 'Trail', required: true },
    date: { type: Date, default: Date.now, index: true },
    status: { type: Boolean, default: false },
    checkedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Patroller', default: null },
    condition: { type: String, enum: Object.values(Conditions) },
    comments: String,
});

const TrailSchema = new mongoose.Schema({
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    name: { type: String, required: true, unique: true },
    difficulty: { type: String, enum: ['green', 'blue', 'black', 'double black'] },
    type: { type: String, enum: ['glades', 'moguls', 'natural', 'race', 'park', 'groomed'] },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    status: { type: String, default: 'closed' },
    trailLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrailLog' }],
});

TrailSchema.index({ mountain:1, name: 1, difficulty: 1 }, { unique: true });

const Trail = mongoose.model('Trail', TrailSchema);
const TrailLog = mongoose.model('TrailLog', TrailLogSchema);

module.exports = { Trail, TrailLog};