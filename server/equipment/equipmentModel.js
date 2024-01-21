const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
    name: String,
    type: String,
    idNumber: { type: String, unique: true },
    inServiceDate: Date,
    outOfServiceDate: Date,
    checkLog: [{
        checkedOn: Date,
        checkedBy: { type: Schema.Types.ObjectId, ref: 'Patroller' },
    }],
    comments: String,
});

const Equipment = mongoose.model('Equipment', EquipmentSchema);

module.exports = Equipment;