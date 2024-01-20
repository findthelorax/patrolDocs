const mongoose = require('mongoose');

const LineCheckSchema = new mongoose.Schema({
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain' },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    patroller: { type: mongoose.Schema.Types.ObjectId, ref: 'Patroller' },
    time: { type: Date, default: Date.now },
    comments: String,
});

module.exports = mongoose.model('LineCheck', LineCheckSchema);