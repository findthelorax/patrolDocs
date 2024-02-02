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

		if (req.params.areaId) {
			const area = mountain.areas.id(req.params.areaId);
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
		const mountain = await Mountain.findById(req.params.mountainId);
		const area = mountain.areas.id(req.params.areaId);
		const trail = area.trails.id(req.params.trailId);
		trail.set(req.body);
		await mountain.save();
		res.status(200).json(mountain);
	} catch (err) {
		res.status(400).json({ message: err.message });
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
        const trailLogs = await TrailLog.find();
        res.status(200).json(trailLogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTrailLogs = async (req, res) => {
	try {
		const trailLogs = await TrailLog.find({ trail: req.params.trailId });
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
        const trailLog = await TrailLog.findById(req.params.trailLogId);
        if (!trailLog) {
            return res.status(404).json({ message: 'Trail log not found' });
        }
        res.status(200).json(trailLog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createTrailLog = async (req, res) => {
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