const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
    name: String,
    description: String,
    mountain: { type: Schema.Types.ObjectId, ref: 'Mountain' },
    lifts: [{ type: Schema.Types.ObjectId, ref: 'Lift' }],
    trails: [{ type: Schema.Types.ObjectId, ref: 'Trail' }],
});

const MountainSchema = new Schema({
    name: String,
    location: {
        city: String,
        state: String
    },
    areas: [AreaSchema],  // embed Area documents directly
    lifts: [{ type: Schema.Types.ObjectId, ref: 'Lift' }],
    trails: [{ type: Schema.Types.ObjectId, ref: 'Trail' }],
});

const Mountain = mongoose.model('Mountain', MountainSchema);
const Area = mongoose.model('Area', AreaSchema);

module.exports = { Mountain, Area };