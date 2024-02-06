const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocationSchema = require('../location/locationModel');

const EquipmentLogSchema = new Schema({
    equipment: { type: Schema.Types.ObjectId, ref: 'Equipment' },
    checkedOn: Date,
    checkedBy: { type: Schema.Types.ObjectId, ref: 'Patroller' },
    notes: String,
});

const EquipmentLog = mongoose.model('EquipmentLog', EquipmentLogSchema);

const EquipmentSchema = new Schema({
    name: String,
    type: {
        type: String,
        enum: [
            'Toboggan', 'AED', 'Trauma Pack', 'Tail Rope', 'Vacuum Mattress', 
            'Vacuum Splint (Small)', 'Vacuum Splint (Medium)', 'Vacuum Splint (Large)', 
            'Backboard', 'Scoop', 'Hare', 'Pelvic Binder', 'Sled Pack', 'Chair', 
            'Roll Cab Kit', 'T-Seat', 'Helmet', 'Harness', 'Rope', 'Extra Gear', 
            'Oxygen Kit', 'Other'
        ],
        required: true
    },
    idNumber: { type: String, unique: true },
    inServiceDate: Date,
    outOfServiceDate: Date,
    checkLog: { type: Schema.Types.ObjectId, ref: 'EquipmentLog' },
    description: String,
    mountain: { type: Schema.Types.ObjectId, ref: 'Mountain' },
    location: LocationSchema,
});

const Equipment = mongoose.model('Equipment', EquipmentSchema);

module.exports = { Equipment, EquipmentLog };