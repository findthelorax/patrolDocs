const mongoose = require('mongoose');

const LodgeSchema = new mongoose.Schema({
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    name: { type: String, required: true, unique: true },
    status: { type: String, default: 'closed' },
});

LodgeSchema.index({ mountain:1, name: 1}, { unique: true });

const Lodge = mongoose.model('Lodge', LodgeSchema);

module.exports = { Lodge };