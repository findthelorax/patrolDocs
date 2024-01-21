const mongoose = require('mongoose');

const HutSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }],
    paperwork: { type: mongoose.Schema.Types.ObjectId, ref: 'Paperwork' },
    cleaningLog: [{
        cleanedOn: Date,
        cleanedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Patroller' },
    }],
    comments: String,
});

const Hut = mongoose.model('Hut', HutSchema);

module.exports = Hut;