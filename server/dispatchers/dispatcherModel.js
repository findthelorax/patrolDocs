const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DispatcherLogSchema = new Schema({
	mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
	date: Date,
	patroller: { type: Schema.Types.ObjectId, ref: 'Patroller', required: true },
});

DispatcherLogSchema.index({ mountain: 1, date: 1 }, { unique: true });

const DispatcherLog = mongoose.model('PatrolDispatcherLog', DispatcherLogSchema);

module.exports = { DispatcherLog };