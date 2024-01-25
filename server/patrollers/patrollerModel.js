const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatrolDispatcherLogSchema = new Schema({
	mountain: { type: mongoose.Schema.Types.ObjectId, ref: 'Mountain', required: true },
	date: { type: Date, default: Date.now },
	patroller: { type: Schema.Types.ObjectId, ref: 'Patroller', required: true },
});

const PatrollerSchema = new Schema({
	firstName: String,
	lastName: String,
	position: String,
	mountains: [{ type: Schema.Types.ObjectId, ref: 'Mountain' }],
});

PatrollerSchema.index({ firstName: 1, lastName: 1 }, { unique: true });

const Patroller = mongoose.model('Patroller', PatrollerSchema);
const PatrolDispatcherLog = mongoose.model('PatrolDispatcherLog', PatrolDispatcherLogSchema);

module.exports = { Patroller, PatrolDispatcherLog };