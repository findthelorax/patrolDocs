const { Mountain } = require('../mountains/mountainModel');
const IncidentLog = require('./incidentLogModel');

exports.createLog = async (req, res) => {
    try {
        const patrollers = Array.isArray(req.body.patrollers) ? req.body.patrollers : [req.body.patrollers];

        const newIncidentLog = new IncidentLog({
            ...req.body,
            patrollers,
            mountain: req.params.mountainId,
        });

        const savedIncidentLog = await newIncidentLog.save();

        const mountain = await Mountain.findById(req.params.mountainId);
        if (!mountain) return res.status(404).json({ message: 'No mountain found with this ID' });
        mountain.incidentLogs.push(savedIncidentLog._id);
        await mountain.save();

        res.status(201).json(savedIncidentLog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllLogs = async (req, res) => {
	try {
		const incidentLogs = await IncidentLog.find({ mountain: req.params.mountainId }).populate('patrollers');
		res.status(200).json(incidentLogs);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getLog = async (req, res) => {
	try {
		const incidentLog = await IncidentLog.findOne({
			_id: req.params.incidentLogId,
			mountain: req.params.mountainId,
		}).populate('patrollers');
		if (!incidentLog) return res.status(404).json({ message: 'No incident log found with this ID' });
		res.status(200).json(incidentLog);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.updateLog = async (req, res) => {
	try {
		const updatedIncidentLog = await IncidentLog.findOneAndUpdate(
			{ _id: req.params.incidentLogId, mountain: req.params.mountainId },
			req.body,
			{ new: true }
		);
		if (!updatedIncidentLog) return res.status(404).json({ message: 'No incident log found with this ID' });
		res.status(200).json(updatedIncidentLog);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.deleteLog = async (req, res) => {
	try {
		const incidentLog = await IncidentLog.findOne({
			_id: req.params.incidentLogId,
			mountain: req.params.mountainId,
		});
		if (!incidentLog) return res.status(404).json({ message: 'No incident log found with this ID' });

		const mountain = await Mountain.findOne({ incidentLogs: incidentLog._id });
		if (mountain) {
			const index = mountain.incidentLogs.indexOf(incidentLog._id);
			if (index > -1) {
				mountain.incidentLogs.splice(index, 1);
				await mountain.save();
			}
		}

		await IncidentLog.findOneAndDelete({ _id: req.params.incidentLogId, mountain: req.params.mountainId });

		res.status(204).json(null);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
