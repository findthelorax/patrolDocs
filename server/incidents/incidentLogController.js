const PatrolLog = require('./incidentLogModel');

exports.getAllLogs = async (req, res) => {
    const logs = await PatrolLog.find();
    res.status(200).json(logs);
};

exports.getLog = async (req, res) => {
    const log = await PatrolLog.findById(req.params.id);
    res.status(200).json(log);
};

exports.createLog = async (req, res) => {
    const newLog = new PatrolLog(req.body);
    const log = await newLog.save();
    res.status(201).json(log);
};

exports.updateLog = async (req, res) => {
    const updatedLog = await PatrolLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedLog);
};

exports.deleteLog = async (req, res) => {
    await PatrolLog.findByIdAndDelete(req.params.id);
    res.status(204).json(null);
};