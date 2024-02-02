const { Hut, HutLog } = require('./hutModel');
const { Mountain } = require('../mountains/mountainModel');

exports.getAllHuts = async (req, res) => {
    try {
        const mountainId = req.params.mountainId;
        const huts = await Hut.find({ mountain: mountainId });
        res.status(200).json(huts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getHut = async (req, res) => {
    try {
        const hut = await Hut.findById(req.params.hutId);
        if (hut) {
            res.status(200).json(hut);
        } else {
            res.status(404).json({ message: 'Hut not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createHut = async (req, res) => {
    try {
        const newHut = new Hut({
            ...req.body,
            mountain: req.params.mountainId,
        });
        const hut = await newHut.save();

        const mountain = await Mountain.findById(req.params.mountainId);
        if (!mountain) return res.status(404).json({ message: 'No mountain found with this ID' });
        mountain.huts.push(hut._id);
        await mountain.save();

        if (req.body.area) {
            const area = mountain.areas.id(req.body.area);
            if (!area) return res.status(404).json({ message: 'No area found with this ID' });
            area.huts.push(hut._id);
            await mountain.save();
        }

        res.status(201).json(hut);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'A hut with this name already exists' });
        }
        res.status(500).json({ message: err.message });
    }
};

exports.updateHut = async (req, res) => {
    try {
        const updatedHut = await Hut.findByIdAndUpdate(req.params.hutId, req.body, { new: true });
        res.status(200).json(updatedHut);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteHut = async (req, res) => {
    try {
        const hut = await Hut.findById(req.params.hutId);
        console.log("🚀 ~ file: hutController.js:63 ~ exports.deleteHut ~ req.params.hutId:", req.params)
        if (!hut) return res.status(404).json({ message: 'No hut found with this ID' });

        // Find the mountain that contains the hut and remove the hut's reference
        const mountain = await Mountain.findOne({ huts: hut._id });
        if (mountain) {
            const index = mountain.huts.indexOf(hut._id);
            if (index > -1) {
                mountain.huts.splice(index, 1);
                await mountain.save();
            }
        }

        // Find the area that contains the hut and remove the hut's reference
        const area = await Mountain.areas.findOne({ huts: hut._id });
        if (area) {
            const index = area.huts.indexOf(hut._id);
            if (index > -1) {
                area.huts.splice(index, 1);
                await area.save();
            }
        }

        // Delete the hut
        await Hut.findByIdAndDelete(req.params.hutId);

        res.status(204).json(null);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Hut Logs
exports.getAllHutLogs = async (req, res) => {
    try {
        const hutLogs = await HutLog.find();
        res.status(200).json(hutLogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getHutLogs = async (req, res) => {
    try {
        const hutLogs = await HutLog.find({ hut: req.params.hutId });
        res.status(200).json(hutLogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getHutLog = async (req, res) => {
    try {
        const hutLog = await HutLog.findOne({ 
            _id: req.params.logId, 
            hut: req.params.hutId 
        }).populate('hut', 'mountain').exec();

        if (hutLog && hutLog.hut.mountain.toString() === req.params.mountainId) {
            res.status(200).json(hutLog);
        } else {
            res.status(404).json({ message: 'Log not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createHutLog = async (req, res) => {
    try {
        const hut = await Hut.findById(req.params.hutId);
        if (hut) {
            hut.log.push(req.body);
            const savedHut = await hut.save();
            res.status(201).json(savedHut);
        } else {
            res.status(404).json({ message: 'Hut not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateHutLog = async (req, res) => {
    try {
        const hut = await Hut.findById(req.params.hutId);
        if (hut && hut.log.id(req.params.logId)) {
            Object.assign(hut.log.id(req.params.logId), req.body);
            const savedHut = await hut.save();
            res.status(200).json(savedHut);
        } else {
            res.status(404).json({ message: 'Log not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteHutLog = async (req, res) => {
    try {
        const hut = await Hut.findById(req.params.hutId);
        if (hut && hut.log.id(req.params.logId)) {
            hut.log.id(req.params.logId).remove();
            const savedHut = await hut.save();
            res.status(204).json(null);
        } else {
            res.status(404).json({ message: 'Log not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};