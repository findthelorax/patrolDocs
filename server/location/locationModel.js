const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema(
	{
		area: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Area',
			required: true,
		},
		type: { type: String, enum: ['Trail', 'First Aid Room', 'Lodge', 'Lift', 'Hut', 'Other'], required: true },
		name: { type: String, required: true },
		id: { type: Schema.Types.ObjectId, required: true, refPath: 'type' },
	},
	{ _id: false }
);

module.exports = LocationSchema;
