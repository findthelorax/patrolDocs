const Mountain = require('./mountainModel');

exports.getAllAreas = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        res.status(200).json(mountain.areas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getArea = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        const area = mountain.areas.id(req.params.areaId);
        if (area == null) {
            return res.status(404).json({ message: 'Cannot find area' });
        }
        res.status(200).json(area);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addArea = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        mountain.areas.push(req.body);
        const savedMountain = await mountain.save();
        res.status(201).json(savedMountain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateArea = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        const area = mountain.areas.id(req.params.areaId);
        Object.assign(area, req.body);
        const savedMountain = await mountain.save();
        res.status(200).json(savedMountain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteArea = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        mountain.areas.id(req.params.areaId).remove();
        const savedMountain = await mountain.save();
        res.status(200).json(savedMountain);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};