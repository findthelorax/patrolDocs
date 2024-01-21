const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LineCheckSchema = new mongoose.Schema({
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    lift: { type: Schema.Types.ObjectId, ref: 'Lift', required: true },
    patroller: { type: mongoose.Schema.Types.ObjectId, ref: 'Patroller' },
    time: { type: Date, default: Date.now },
    comments: String,
});

module.exports = mongoose.model('LineCheck', LineCheckSchema);