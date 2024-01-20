const RunLog = require('./runLogModel');

exports.getAllRunLogs = async (req, res) => {
    try {
        const runLogs = await RunLog.find();
        res.status(200).json(runLogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOneRunLog = async (req, res) => {
    try {
        const runLog = await RunLog.findById(req.params.id);
        if (!runLog) {
            return res.status(404).json({ message: 'Run log not found' });
        }
        res.status(200).json(runLog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addRunLog = async (req, res) => {
    try {
        const runLog = new RunLog(req.body);
        const newRunLog = await runLog.save();
        res.status(201).json(newRunLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateRunLog = async (req, res) => {
    try {
        const runLog = await RunLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(runLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteRunLog = async (req, res) => {
    try {
        await RunLog.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Deleted Run Log' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};