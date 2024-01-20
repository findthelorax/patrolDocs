const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaperworkSchema = new Schema({
    tenFifties: { type: Boolean, default: false },
    collisionCards: { type: Boolean, default: false },
    witnessContact: { type: Boolean, default: false },
    infractionCards: { type: Boolean, default: false },
    ambulanceForm: { type: Boolean, default: false },
    rentalForms: { type: Boolean, default: false },
});

const Paperwork = mongoose.model('Paperwork', PaperworkSchema);

module.exports = Paperwork;