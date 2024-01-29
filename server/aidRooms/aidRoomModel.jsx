const mongoose = require('mongoose');

const AidRoomLogSchema = new mongoose.Schema({
    aidRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'AidRoom', required: true },
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

const AidRoomSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }],
    paperwork: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Paperwork' }],
    comments: String,
});

const AidRoom = mongoose.model('Hut', AidRoomSchema);
const AidRoomLog = mongoose.model('HutLog', AidRoomLogSchema);

module.exports = { AidRoom, AidRoomLog };