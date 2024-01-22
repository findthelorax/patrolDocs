const mongoose = require('mongoose');

const HutLogSchema = new mongoose.Schema({
    paperwork: { type: mongoose.Schema.Types.ObjectId, ref: 'Paperwork' },
    equipmentCheckedLog: [{
        equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' },
        checked: { type: Boolean, default: false },
        checkedOn: Date,
        checkedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Patroller' },
    }],
    cleaningLog: [{
        cleanedOn: Date,
        cleanedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Patroller' },
    }],
});

const HutSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }],
    log: { type: mongoose.Schema.Types.ObjectId, ref: 'HutLog' },
    comments: String,
});

const Hut = mongoose.model('Hut', HutSchema);
const HutLog = mongoose.model('HutLog', HutLogSchema);

module.exports = { Hut, HutLog };