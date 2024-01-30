const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipmentLogSchema = new Schema({
    equipment: { type: Schema.Types.ObjectId, ref: 'Equipment' },
    checked: { type: Boolean, default: false },
    checkedOn: Date,
    checkedBy: { type: Schema.Types.ObjectId, ref: 'Patroller' },
});

const EquipmentLog = mongoose.model('EquipmentLog', EquipmentLogSchema);

const LocationSchema = new Schema({
    kind: { type: String, enum: ['Hut', 'Lodge', 'FirstAidRoom', 'Trail', 'Other', 'Available'], required: true },
    item: { type: Schema.Types.ObjectId, required: true, refPath: 'location.kind' },
});

const EquipmentSchema = new Schema({
    name: String,
    type: String,
    idNumber: { type: String, unique: true },
    inServiceDate: Date,
    outOfServiceDate: Date,
    checkLog: { type: Schema.Types.ObjectId, ref: 'EquipmentLog' },
    comments: String,
    location: LocationSchema,
});

const Equipment = mongoose.model('Equipment', EquipmentSchema);

module.exports = { Equipment, EquipmentLog };