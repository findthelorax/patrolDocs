const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncidentSchema = new Schema({
    time: Date,
    type: String,
    mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
    area: { type: Schema.Types.ObjectId, ref: 'Area' },
    trail: { type: Schema.Types.ObjectId, ref: 'Trail' },
    patrollers: [{ type: Schema.Types.ObjectId, ref: 'Patroller', required: true }],
    onSceneTime: Date,
    stableTime: Date,
    transportTime: Date,
    isDryRun: { type: Boolean, default: false },
});

IncidentSchema.pre('save', function(next) {
    if (this.isDryRun) {
        this.onSceneTime = null;
        this.stableTime = null;
        this.transportTime = null;
    }
    next();
});

const IncidentLog = mongoose.model('IncidentLog', IncidentSchema);

module.exports = IncidentLog;