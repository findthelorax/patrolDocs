const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocationSchema = require('../location/locationModel');

const IncidentLogSchema = new Schema({
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    patrollers: [{ type: Schema.Types.ObjectId, ref: 'Patroller', required: true }],
    location: LocationSchema,
    callTime: Date,
    incident: String,
    onSceneTime: Date,
    stableTime: Date,
    transportTime: Date,
    dryRun: { type: Boolean, default: false },
});

IncidentLogSchema.index({ mountain: 1, 'location.id': 1, callTime: 1 }, { unique: true });

IncidentLogSchema.pre('save', function(next) {
    if (this.dryRun) {
        this.onSceneTime = null;
        this.stableTime = null;
        this.transportTime = null;
    }
    next();
});

const IncidentLog = mongoose.model('IncidentLog', IncidentLogSchema);

module.exports = IncidentLog;