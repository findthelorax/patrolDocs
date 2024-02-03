const { Mountain } = require('../mountains/mountainModel');
const { Trail, TrailLog } = require('./trailModel');

exports.getAllTrails = async (req, res) => {
	try {
		const mountainId = req.params.mountainId;
		const trails = await Trail.find({ mountain: mountainId });
		res.status(200).json(trails);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getOneTrail = async (req, res) => {
	try {
		const mountainId = req.params.mountainId;
		const trailId = req.params.trailId;
		const trail = await Trail.findOne({ _id: trailId, mountain: mountainId });
		if (!trail) {
			return res.status(404).json({ message: 'Trail not found' });
		}
		res.status(200).json(trail);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.createTrail = async (req, res) => {
	try {
		const mountain = await Mountain.findById(req.params.mountainId);
		const existingTrail = await Trail.findOne({
			name: req.body.name,
			difficulty: req.body.difficulty,
			mountain: mountain._id,
		});

		if (existingTrail) {
			return res.status(400).json({ message: 'Trail already exists' });
		}

		const newTrail = new Trail(req.body);
		newTrail.mountain = mountain._id;
		await newTrail.save();

		const areaId = req.params.areaId || req.body.areaId;

		if (areaId) {
			const area = mountain.areas.id(areaId);
			if (area) {
				area.trails.push(newTrail._id);
			} else {
				return res.status(404).json({ message: 'Area not found' });
			}
		} else {
			mountain.trails.push(newTrail._id);
		}

		await mountain.save();
		res.status(201).json(newTrail);
	} catch (err) {
		if (err.name === 'MongoError' && err.code === 11000) {
			return res.status(400).json({ message: 'Trail already exists' });
		}
		res.status(400).json({ message: err.message });
	}
};

exports.updateTrail = async (req, res) => {
    try {
        const updateTrail = await Trail.findByIdAndUpdate(req.params.trailId, req.body, { new: true });
        if (!updateTrail) return res.status(404).json({ message: 'No trail found with this ID' });
        res.status(200).json(updateTrail);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteTrail = async (req, res) => {
	try {
		const mountain = await Mountain.findById(req.params.mountainId);
		const area = mountain.areas.id(req.params.areaId);
		area.trails.id(req.params.trailId).remove();
		await mountain.save();
		res.status(200).json({ message: 'Deleted Trail' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.addTrailToArea = async (req, res) => {
	try {
		const mountain = await Mountain.findById(req.params.mountainId);
		const area = mountain.areas.id(req.params.areaId);
		const trail = await Trail.findById(req.params.trailId);

		if (!area || !trail) {
			return res.status(404).json({ message: 'Area or Trail not found' });
		}

		area.trails.push(trail._id);
		await mountain.save();
		res.status(200).json({ message: 'Trail added to Area' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.deleteTrailFromArea = async (req, res) => {
	try {
		const mountain = await Mountain.findById(req.params.mountainId);
		const area = mountain.areas.id(req.params.areaId);

		if (!area) {
			return res.status(404).json({ message: 'Area not found' });
		}

		area.trails.pull(req.params.trailId);
		await mountain.save();
		res.status(200).json({ message: 'Trail removed from Area' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Trail Logs
exports.getAllTrailLogs = async (req, res) => {
	try {
		const trailLogs = await TrailLog.find({ mountain: req.params.mountainId });
		res.status(200).json(trailLogs);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getTrailLogs = async (req, res) => {
	try {
		const trailLogs = await TrailLog.find({ mountain: req.params.mountainId, trail: req.params.trailId });
		if (!trailLogs) {
			return res.status(404).json({ message: 'No logs found for this trail' });
		}
		res.status(200).json(trailLogs);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getOneTrailLog = async (req, res) => {
	try {
		const trailLog = await TrailLog.findOne({ mountain: req.params.mountainId, trail: req.params.trailId, _id: req.params.trailLogId });
		if (!trailLog) {
			return res.status(404).json({ message: 'Trail log not found' });
		}
		res.status(200).json(trailLog);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.createTrailLog = async (req, res) => {
	console.log("🚀 ~ file: trailController.js:160 ~ exports.createTrailLog= ~ req.body:", req.body)
	console.log("🚀 ~ file: trailController.js:160 ~ exports.createTrailLog= ~ req.params:", req.params)
	try {
		const trailLog = new TrailLog({
			...req.body,
			trail: req.params.trailId,
			mountain: req.params.mountainId
		});
		const newTrailLog = await trailLog.save();
		res.status(201).json(newTrailLog);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.updateTrailLog = async (req, res) => {
	try {
		const trailLog = await TrailLog.updateOne({ mountain: req.params.mountainId, trail: req.params.trailId, _id: req.params.trailLogId }, req.body);
		res.status(200).json({ message: 'Updated trail log' });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.deleteTrailLog = async (req, res) => {
	try {
		await TrailLog.deleteOne({ mountain: req.params.mountainId, trail: req.params.trailId, _id: req.params.trailLogId });
		res.status(200).json({ message: 'Deleted trail log' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};