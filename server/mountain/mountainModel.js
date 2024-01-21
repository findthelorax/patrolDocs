const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    mountain: { type: Schema.Types.ObjectId, ref: 'Mountain', required: true },
    lifts: [{ type: Schema.Types.ObjectId, ref: 'Lift' }],
    trails: [{ type: Schema.Types.ObjectId, ref: 'Trail' }],
    huts: [{ type: Schema.Types.ObjectId, ref: 'Hut' }],
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
});

const Mountain = mongoose.model('Mountain', MountainSchema);
const Area = mongoose.model('Area', AreaSchema);

module.exports = { Mountain, Area };