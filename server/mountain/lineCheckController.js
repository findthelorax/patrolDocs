const LineCheck = require('../models/lineCheckModel');

exports.getAllLineChecks = async (req, res) => {
    try {
        const lineChecks = await LineCheck.find().populate('area mountain');
        res.status(200).json(lineChecks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLineCheck = async (req, res) => {
    try {
        const lineCheck = await LineCheck.findById(req.params.id).populate('area mountain');
        if (!lineCheck) {
            return res.status(404).json({ message: 'Line check not found' });
        }
        res.status(200).json(lineCheck);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addLineCheck = async (req, res) => {
    try {
        const lineCheck = new LineCheck(req.body);
        const newLineCheck = await lineCheck.save();
        res.status(201).json(newLineCheck);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateLineCheck = async (req, res) => {
    try {
        const lineCheck = await LineCheck.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(lineCheck);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteLineCheck = async (req, res) => {
    try {
        await LineCheck.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Deleted Line Check' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};