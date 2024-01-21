const mongoose = require('mongoose');
const { Conditions } = require('../helpers/conditions');

const TrailLogSchema = new mongoose.Schema({
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    trail: { type: mongoose.Schema.Types.ObjectId, ref: 'Trail', required: true },
    date: { type: Date, default: Date.now, index: true },
    status: { type: Boolean, default: false },
    checkedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Patroller', default: null },
    condition: { type: String, enum: Object.values(Conditions) },
    comments: String,
});

module.exports = TrailLogSchema;