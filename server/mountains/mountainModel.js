const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    lifts: [{ type: Schema.Types.ObjectId, ref: 'Lift' }],
    trails: [{ type: Schema.Types.ObjectId, ref: 'Trail' }],
    huts: [{ type: Schema.Types.ObjectId, ref: 'Hut' }],
    lodges: [{ type: Schema.Types.ObjectId, ref: 'Lodge' }],
    aidRooms: [{ type: Schema.Types.ObjectId, ref: 'AidRoom' }],
    equipment: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }],
});

const MountainSchema = new Schema({
    name: { type: String, required: true, unique: true },
    location: {
        city: String,
        state: String
    },
    areas: [AreaSchema],
    lifts: [{ type: Schema.Types.ObjectId, ref: 'Lift' }],
    trails: [{ type: Schema.Types.ObjectId, ref: 'Trail' }],
    huts: [{ type: Schema.Types.ObjectId, ref: 'Hut' }],
    lodges: [{ type: Schema.Types.ObjectId, ref: 'Lodge' }],
    aidRooms: [{ type: Schema.Types.ObjectId, ref: 'AidRoom' }],
    equipment: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }],
    patrollers: [{ type: Schema.Types.ObjectId, ref: 'Patroller' }],
});

const Mountain = mongoose.model('Mountain', MountainSchema);

module.exports = { Mountain };