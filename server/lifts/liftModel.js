const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LiftSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain' },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    status: { type: String, default: 'closed' },
    coordinates: { type: [Number], required: true },
});

const LiftLineCheckSchema = new mongoose.Schema({
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    lift: { type: Schema.Types.ObjectId, ref: 'Lift', required: true },
    patroller: { type: mongoose.Schema.Types.ObjectId, ref: 'Patroller' },
    time: { type: Date, default: Date.now },
    comments: String,
});

module.exports = {
    Lift: mongoose.model('Lift', LiftSchema),
    LiftLineCheck: mongoose.model('LiftLineCheck', LiftLineCheckSchema)
};