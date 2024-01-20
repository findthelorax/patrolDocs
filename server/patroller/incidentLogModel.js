const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncidentSchema = new Schema({
    time: Date,
    type: String,
    run: { type: Schema.Types.ObjectId, ref: 'Run' },
    patrollers: [{ type: Schema.Types.ObjectId, ref: 'Patroller' }],
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