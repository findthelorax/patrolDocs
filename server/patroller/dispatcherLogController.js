const DispatcherLog = require('./dispatcherLogModel');

exports.getAllLogs = async (req, res) => {
    const logs = await DispatcherLog.find();
    res.status(200).json(logs);
};

exports.getLog = async (req, res) => {
    const log = await DispatcherLog.findById(req.params.dispatcherLogId);
    res.status(200).json(log);
};

exports.createLog = async (req, res) => {
    const newLog = new DispatcherLog(req.body);
    const log = await newLog.save();
    res.status(201).json(log);
};

exports.updateLog = async (req, res) => {
    const updatedLog = await DispatcherLog.findByIdAndUpdate(req.params.dispatcherLogId, req.body, { new: true });
    res.status(200).json(updatedLog);
};

exports.deleteLog = async (req, res) => {
    await DispatcherLog.findByIdAndDelete(req.params.dispatcherLogId);
    res.status(204).json(null);
};