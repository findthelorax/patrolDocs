const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatrollerSchema = new Schema({
    firstName: String,
    lastName: String,
    position: String,
    mountain: { type: Schema.Types.ObjectId, ref: 'Mountain' },
});

const Patroller = mongoose.model('Patroller', PatrollerSchema);

module.exports = Patroller;