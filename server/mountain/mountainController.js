const { Mountain } = require('./mountainModel');

exports.getAllMountains = async (req, res) => {
	try {
		const mountains = await Mountain.find();
		res.status(200).json(mountains);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getMountain = async (req, res) => {
	try {
		const mountain = await Mountain.findById(req.params.mountainId);
		if (mountain == null) {
			return res.status(404).json({ message: 'Cannot find mountain' });
		}
		res.status(200).json(mountain);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.addMountain = async (req, res) => {
	const mountain = new Mountain({
		name: req.body.name,
		location: req.body.location,
	});
	try {
		const newMountain = await mountain.save();
		res.status(201).json(newMountain);
	} catch (err) {
		if (err.code === 11000) {
			res.status(400).json({ message: 'Mountain name must be unique' });
		} else {
			res.status(400).json({ message: err.message });
		}
	}
};

exports.updateMountain = async (req, res) => {
	try {
		const updatedMountain = await Mountain.findByIdAndUpdate(req.params.mountainId, req.body, { new: true });
		res.status(200).json(updatedMountain);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.deleteMountain = async (req, res) => {
	try {
		await Mountain.findByIdAndDelete(req.params.mountainId);
		res.status(200).json({ message: 'Deleted Mountain' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Areas
exports.getAllAreas = async (req, res) => {
	try {
		const mountain = await Mountain.findById(req.params.mountainId);
		res.status(200).json(mountain.areas);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getArea = async (req, res) => {
	try {
		const mountain = await Mountain.findById(req.params.mountainId);
		const area = mountain.areas.id(req.params.areaId);
		if (area == null) {
			return res.status(404).json({ message: 'Cannot find area' });
		}
		res.status(200).json(area);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.addArea = async (req, res) => {
	try {
		const mountain = await Mountain.findById(req.params.mountainId);
		if (!mountain) {
			return res.status(404).json({ message: 'Cannot find mountain' });
		}

		// Check if an area with the same name already exists
		const existingArea = mountain.areas.find((area) => area.name === req.body.name);
		if (existingArea) {
			return res.status(400).json({ message: 'Area name must be unique within a mountain' });
		}

		const area = req.body;
		area.mountain = req.params.mountainId;
		mountain.areas.push(area);

		await mountain.save();
		res.status(201).json(area);
	} catch (err) {
		console.log("🚀 ~ file: mountainController.js:100 ~ exports.addArea= ~ err:", err)
		if (err.name === 'ValidationError') {
			res.status(400).json({ message: 'A mountain is required for an area' });
		} else {
			res.status(400).json({ message: err.message });
		}
	}
};

exports.updateArea = async (req, res) => {
	try {
		const mountain = await Mountain.findById(req.params.mountainId);
		const area = mountain.areas.id(req.params.areaId);
		Object.assign(area, req.body);
		await mountain.save();
		res.status(200).json(area);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.deleteArea = async (req, res) => {
	try {
		const mountain = await Mountain.findById(req.params.mountainId);
		mountain.areas.id(req.params.areaId).remove();
		const savedMountain = await mountain.save();
		res.status(200).json(savedMountain);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
