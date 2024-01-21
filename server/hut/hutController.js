const Hut = require('./hutModel');

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
        if (hut == null) {
            return res.status(404).json({ message: 'Cannot find hut' });
        }
        res.status(200).json(hut);
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
        await Hut.findByIdAndRemove(req.params.hutId);
        res.status(200).json({ message: 'Deleted Hut' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};