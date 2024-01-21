const mongoose = require('mongoose');

const TrailSchema = new mongoose.Schema({
    name: String,
    difficulty: String,
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    status: { type: String, default: 'closed' },
});

TrailSchema.index({ name: 1, difficulty: 1 }, { unique: true });

const Trail = mongoose.model('Trail', TrailSchema);

module.exports = Trail;