const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatrollerSchema = new Schema({
	firstName: String,
	lastName: String,
	position: String,
	mountains: [{ type: Schema.Types.ObjectId, ref: 'Mountain' }],
});

PatrollerSchema.index({ firstName: 1, lastName: 1 }, { unique: true });

const Patroller = mongoose.model('Patroller', PatrollerSchema);

module.exports = { Patroller };