const mongoose = require('mongoose');
const { Conditions } = require('../helpers/conditions');

const RunLogSchema = new mongoose.Schema({
    run: { type: mongoose.Schema.Types.ObjectId, ref: 'Run' },
    date: { type: Date, default: Date.now, index: true },
    status: { type: Boolean, default: false },
    openedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Patroller' },
    condition: { type: String, enum: Object.values(Conditions) },
    comments: String,
});

module.exports = RunLogSchema;