// mountainController.js

const Mountain = require('../models/mountainModel');

exports.getAllMountains = async (req, res) => {
    try {
        const mountains = await Mountain.find();
        res.status(200).json(mountains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMountain = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.id);
        if (mountain == null) {
            return res.status(404).json({ message: 'Cannot find mountain' });
        }
        res.status(200).json(mountain);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addMountain = async (req, res) => {
    const mountain = new Mountain({
        name: req.body.name,
        location: req.body.location,
        areas: req.body.areas
    });
    try {
        const newMountain = await mountain.save();
        res.status(201).json(newMountain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateMountain = async (req, res) => {
    try {
        const updatedMountain = await Mountain.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedMountain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteMountain = async (req, res) => {
    try {
        await Mountain.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Deleted Mountain' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};