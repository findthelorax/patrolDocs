const TrailLog = require('./trailLogModel');

exports.getAllTrailLogs = async (req, res) => {
    try {
        const trailLogs = await TrailLog.find();
        res.status(200).json(trailLogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOneTrailLog = async (req, res) => {
    try {
        const trailLog = await TrailLog.findById(req.params.trailLogId);
        if (!trailLog) {
            return res.status(404).json({ message: 'Trail log not found' });
        }
        res.status(200).json(trailLog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addTrailLog = async (req, res) => {
    try {
        const trailLog = new TrailLog(req.body);
        const newTrailLog = await trailLog.save();
        res.status(201).json(newTrailLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateTrailLog = async (req, res) => {
    try {
        const trailLog = await TrailLog.findByIdAndUpdate(req.params.trailLogId, req.body, { new: true });
        res.status(200).json(trailLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteTrailLog = async (req, res) => {
    try {
        await TrailLog.findByIdAndDelete(req.params.trailLogId);
        res.status(200).json({ message: 'Deleted Trail Log' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};