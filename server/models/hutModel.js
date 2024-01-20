const mongoose = require('mongoose');
const AreaSchema = require('./areaModel');
const EquipmentSchema = require('./equipmentModel');

const HutSchema = new mongoose.Schema({
    name: String,
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain' },
    area: AreaSchema,
    equipment: [EquipmentSchema],
    cleaningLog: [{
        cleanedOn: Date,
        cleanedBy: { type: Schema.Types.ObjectId, ref: 'Patroller' },
    }],
});

const Hut = mongoose.model('Hut', HutSchema);

module.exports = Hut;