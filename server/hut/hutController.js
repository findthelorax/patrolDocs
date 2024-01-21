const Hut = require('./hutModel');
const { Mountain, Area } = require('../mountain/mountainModel');

exports.getAllHuts = async (req, res) => {
    try {
        const mountainId = req.params.mountainId;
        const huts = await Hut.find({ mountain: mountainId });
        res.status(200).json(huts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getHut = async (req, res) => {
    try {
        const hut = await Hut.findById(req.params.hutId);
        if (hut) {
            res.status(200).json(hut);
        } else {
            res.status(404).json({ message: 'Hut not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addHut = async (req, res) => {
    const hut = new Hut({
        name: req.body.name,
        mountain: req.params.mountainId,
        area: req.body.area,
        equipment: req.body.equipment,
    });
    try {
        const newHut = await hut.save();

        // Find the mountain and add the new hut's ID to the huts array
        const mountain = await Mountain.findById(req.params.mountainId);
        if (!mountain) {
            return res.status(404).json({ message: 'Cannot find mountain' });
        }
        mountain.huts.push(newHut._id);
        await mountain.save();

        res.status(201).json(newHut);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateHut = async (req, res) => {
    try {
        const updatedHut = await Hut.findByIdAndUpdate(req.params.hutId, req.body, { new: true });
        res.status(200).json(updatedHut);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteHut = async (req, res) => {
    try {
        const hut = await Hut.findById(req.params.hutId);
        console.log("🚀 ~ file: hutController.js:63 ~ exports.deleteHut ~ req.params.hutId:", req.params)
        if (!hut) return res.status(404).json({ message: 'No hut found with this ID' });

        // Find the mountain that contains the hut and remove the hut's reference
        const mountain = await Mountain.findOne({ huts: hut._id });
        if (mountain) {
            const index = mountain.huts.indexOf(hut._id);
            if (index > -1) {
                mountain.huts.splice(index, 1);
                await mountain.save();
            }
        }

        // Find the area that contains the hut and remove the hut's reference
        const area = await Area.findOne({ huts: hut._id });
        if (area) {
            const index = area.huts.indexOf(hut._id);
            if (index > -1) {
                area.huts.splice(index, 1);
                await area.save();
            }
        }

        // Delete the hut
        await Hut.findByIdAndDelete(req.params.hutId);

        res.status(204).json(null);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};