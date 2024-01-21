const { Mountain } = require('../mountain/mountainModel');
const Trail = require('./trailModel');

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
		const mountain = await Mountain.findById(req.params.mountainId);
		const area = mountain.areas.id(req.params.areaId);
		const trail = area.trails.id(req.params.trailId);
		if (!trail) {
			return res.status(404).json({ message: 'Trail not found' });
		}
		res.status(200).json(trail);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.addTrail = async (req, res) => {
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
