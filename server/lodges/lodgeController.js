const { Mountain } = require('../mountains/mountainModel');
const { Lodge } = require('./lodgeModel');

exports.getAllLodges = async (req, res) => {
	try {
		const mountainId = req.params.mountainId;
		const lodges = await Lodge.find({ mountain: mountainId });
		res.status(200).json(lodges);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getOneLodge = async (req, res) => {
	try {
		const mountain = await Mountain.findById(req.params.mountainId);
		const area = mountain.areas.id(req.params.areaId);
		const lodge = area.lodges.id(req.params.lodgeId);
		if (!lodge) {
			return res.status(404).json({ message: 'Lodge not found' });
		}
		res.status(200).json(lodge);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.createLodge = async (req, res) => {
	try {
		const mountain = await Mountain.findById(req.params.mountainId);
		const existingLodge = await Lodge.findOne({
			name: req.body.name,
			mountain: mountain._id,
		});

		if (existingLodge) {
			return res.status(400).json({ message: 'Lodge already exists' });
		}

		const newLodge = new Lodge(req.body);
		newLodge.mountain = mountain._id;
		await newLodge.save();

		if (req.body.area) {
			const area = mountain.areas.id(req.body.area);
			if (area) {
				area.lodges.push(newLodge._id);
			} else {
				return res.status(404).json({ message: 'Area not found' });
			}
		} else {
			mountain.lodges.push(newLodge._id);
		}

		await mountain.save();
		res.status(201).json(newLodge);
	} catch (err) {
		if (err.name === 'MongoError' && err.code === 11000) {
			return res.status(400).json({ message: 'Lodge already exists' });
		}
		res.status(400).json({ message: err.message });
	}
};

exports.updateLodge = async (req, res) => {
	try {
		const mountain = await Mountain.findById(req.params.mountainId);
		const area = mountain.areas.id(req.params.areaId);
		const lodge = area.lodges.id(req.params.lodgeId);
		lodge.set(req.body);
		await mountain.save();
		res.status(200).json(mountain);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.deleteLodge = async (req, res) => {
	try {
		const mountain = await Mountain.findById(req.params.mountainId);
		const area = mountain.areas.id(req.params.areaId);
		area.lodges.id(req.params.lodgeId).remove();
		await mountain.save();
		res.status(200).json({ message: 'Deleted Lodge' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
