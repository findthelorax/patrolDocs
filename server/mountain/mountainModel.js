const mongoose = require('mongoose');
const RunSchema = require('../run/runModel');

const AreaSchema = new mongoose.Schema({
	name: String,
	description: String,
    runs: [RunSchema],
});

const MountainSchema = new mongoose.Schema({
	name: String,
	location: String,
	areas: [AreaSchema],
});

const Mountain = mongoose.model('Mountain', MountainSchema);

module.exports = Mountain;
