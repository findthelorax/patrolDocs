const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncidentSchema = new Schema({
    time: Date,
    type: String,
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    trail: { type: Schema.Types.ObjectId, ref: 'Trail' },
    patrollers: [{ type: Schema.Types.ObjectId, ref: 'Patroller', required: true }],
    onSceneTime: Date,
    stableTime: Date,
    transportTime: Date,
    isDryRun: { type: Boolean, default: false },
});

const PatrolLogSchema = new Schema({
    date: { type: Date, default: Date.now },
    incidents: [IncidentSchema],
});

IncidentSchema.pre('save', function(next) {
    if (this.isDryRun) {
        this.onSceneTime = null;
        this.stableTime = null;
        this.transportTime = null;
    }
    next();
});

const PatrolLog = mongoose.model('PatrolLog', PatrolLogSchema);

module.exports = PatrolLog;