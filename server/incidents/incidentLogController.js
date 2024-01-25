const IncidentLog = require('./incidentLogModel');

exports.createLog = async (req, res) => {
    const incidentLog = new IncidentLog(req.body);
    const savedIncidentLog = await incidentLog.save();
    res.status(201).json(savedIncidentLog);
};

exports.getAllLogs = async (req, res) => {
    const incidentLogs = await IncidentLog.find();
    res.status(200).json(incidentLogs);
};

exports.getLog = async (req, res) => {
    const incidentLog = await IncidentLog.findById(req.params.incidentLogId);
    res.status(200).json(incidentLog);
};

exports.updateLog = async (req, res) => {
    const updatedIncidentLog = await IncidentLog.findByIdAndUpdate(req.params.incidentLogId, req.body, { new: true });
    res.status(200).json(updatedIncidentLog);
};

exports.deleteLog = async (req, res) => {
    await IncidentLog.findByIdAndDelete(req.params.incidentLogId);
    res.status(204).send();
};