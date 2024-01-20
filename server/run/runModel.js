const mongoose = require('mongoose');

const RunSchema = new mongoose.Schema({
    name: String,
    difficulty: String,
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
});

module.exports = RunSchema;