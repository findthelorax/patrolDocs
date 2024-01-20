const Hut = require('./hutModel');

exports.getAllHuts = async (req, res) => {
    try {
        const huts = await Hut.find().populate('mountain');
        res.status(200).json(huts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getHut = async (req, res) => {
    try {
        const hut = await Hut.findById(req.params.id).populate('mountain');
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
        mountain: req.body.mountain,
        area: req.body.area,
        equipment: req.body.equipment,
        paperwork: req.body.paperwork,
        cleaningLog: req.body.cleaningLog
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
        const updatedHut = await Hut.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedHut);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteHut = async (req, res) => {
    try {
        await Hut.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Deleted Hut' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};