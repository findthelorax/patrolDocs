const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DispatcherLogSchema = new Schema({
    date: { type: Date, default: Date.now },
    patroller: { type: Schema.Types.ObjectId, ref: 'Patroller' },
});

const DispatcherLog = mongoose.model('DispatcherLog', DispatcherLogSchema);

module.exports = DispatcherLog;