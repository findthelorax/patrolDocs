const Mountain = require('../mountain/mountainModel');

exports.getAllRuns = async (req, res) => {
    try {
        const mountain = await Mountain.findOne({ 'areas.runs._id': req.params.runId });
        const area = mountain.areas.id(req.params.areaId);
        const run = area.runs.id(req.params.runId);
        res.status(200).json(run);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOneRun = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        const area = mountain.areas.id(req.params.areaId);
        const run = area.runs.id(req.params.runId);
        if (!run) {
            return res.status(404).json({ message: 'Run not found' });
        }
        res.status(200).json(run);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addRun = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        const area = mountain.areas.id(req.params.areaId);
        area.runs.push(req.body);
        await mountain.save();
        res.status(201).json(mountain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateRun = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        const area = mountain.areas.id(req.params.areaId);
        const run = area.runs.id(req.params.runId);
        run.set(req.body);
        await mountain.save();
        res.status(200).json(mountain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteRun = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        const area = mountain.areas.id(req.params.areaId);
        area.runs.id(req.params.runId).remove();
        await mountain.save();
        res.status(200).json({ message: 'Deleted Run' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};