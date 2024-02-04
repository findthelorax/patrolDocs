const { Mountain } = require('../mountains/mountainModel');
const { Lodge } = require('./lodgeModel');

exports.getAllLodges = async (req, res) => {
	try {
		const lodges = await Lodge.find({ mountain: req.params.mountainId });
		res.status(200).json(lodges);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getLodge = async (req, res) => {
	try {
		const lodge = await Lodge.findOne({ _id: req.params.lodgeId, mountain: req.params.mountainId });
		if (!lodge) return res.status(404).json({ message: 'No lodge found with this ID' });
		res.status(200).json(lodge);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.createLodge = async (req, res) => {
	try {
		const newLodge = new Lodge({
			...req.body,
			mountain: req.params.mountainId,
		});
		const lodge = await newLodge.save();

		const mountain = await Mountain.findById(req.params.mountainId);
		if (!mountain) return res.status(404).json({ message: 'No mountain found with this ID' });
		mountain.lodges.push(lodge._id);
		await mountain.save();

		if (req.body.area) {
			const area = mountain.areas.id(req.body.area);
			if (!area) return res.status(404).json({ message: 'No area found with this ID' });
			area.lodges.push(lodge._id);
			await mountain.save();
		}

		res.status(201).json(lodge);
	} catch (err) {
		if (err.code === 11000) {
			return res.status(400).json({ message: 'A lodge with this name already exists' });
		}
		res.status(500).json({ message: err.message });
	}
};

exports.updateLodge = async (req, res) => {
	try {
		const updatedLodge = await Lodge.findByIdAndUpdate(req.params.lodgeId, req.body, { new: true });
		if (!updatedLodge) return res.status(404).json({ message: 'No lodge found with this ID' });
		res.status(200).json(updatedLodge);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.deleteLodge = async (req, res) => {
	try {
		const lodge = await Lodge.findById(req.params.lodgeId);
		if (!lodge) return res.status(404).json({ message: 'No lodge found with this ID' });

		// Find the mountain that contains the lodge and remove the lodge's reference
		const mountain = await Mountain.findOne({ lodges: lodge._id });
		if (mountain) {
			const index = mountain.lodges.indexOf(lodge._id);
			if (index > -1) {
				mountain.lodges.splice(index, 1);
				await mountain.save();
			}

			// Find the area that contains the lodge and remove the lodge's reference
			for (let area of mountain.areas) {
				const index = area.lodges.indexOf(lodge._id);
				if (index > -1) {
					area.lodges.splice(index, 1);
				}
			}
			await mountain.save();
		}

		await Lodge.findByIdAndDelete(req.params.lodgeId);

		res.status(204).json(null);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};