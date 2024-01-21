const Paperwork = require('./paperworkModel');

exports.getAllPaperworks = async (req, res) => {
    try {
        const paperworks = await Paperwork.find();
        res.status(200).json(paperworks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPaperwork = async (req, res) => {
    try {
        const paperwork = await Paperwork.findById(req.params.paperworkId);
        if (!paperwork) return res.status(404).json({ message: 'No paperwork found with this ID' });
        res.status(200).json(paperwork);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPaperwork = async (req, res) => {
    try {
        const newPaperwork = new Paperwork(req.body);
        const paperwork = await newPaperwork.save();
        res.status(201).json(paperwork);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePaperwork = async (req, res) => {
    try {
        const updatedPaperwork = await Paperwork.findByIdAndUpdate(req.params.paperworkId

,

 req.body, { new: true });
        if (!updatedPaperwork) return res.status(404).json({ message: 'No paperwork found with this ID' });
        res.status(200).json(updatedPaperwork);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deletePaperwork = async (req, res) => {
    try {
        const paperwork = await Paperwork.findByIdAndDelete(req.params.paperworkId);
        if (!paperwork) return res.status(404).json({ message: 'No paperwork found with this ID' });
        res.status(204).json(null);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};