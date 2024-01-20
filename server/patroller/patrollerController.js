const Patroller = require('./patrollerModel');

exports.getAllPatrollers = async (req, res) => {
    try {
        const patrollers = await Patroller.find().populate('mountain');
        res.status(200).json(patrollers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPatroller = async (req, res) => {
    try {
        const patroller = await Patroller.findById(req.params.id).populate('mountain');
        if (patroller == null) {
            return res.status(404).json({ message: 'Cannot find patroller' });
        }
        res.status(200).json(patroller);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addPatroller = async (req, res) => {
    const patroller = new Patroller({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        mountain: req.body.mountain
    });
    try {
        const newPatroller = await patroller.save();
        res.status(201).json(newPatroller);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updatePatroller = async (req, res) => {
    try {
        const updatedPatroller = await Patroller.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPatroller);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePatroller = async (req, res) => {
    try {
        await Patroller.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Deleted Patroller' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addMountainToPatroller = async (req, res) => {
    try {
        const patroller = await Patroller.findById(req.params.id);
        patroller.mountains.push(req.params.mountainId);
        const updatedPatroller = await patroller.save();
        res.status(200).json(updatedPatroller);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.removeMountainFromPatroller = async (req, res) => {
    try {
        const patroller = await Patroller.findById(req.params.id);
        const index = patroller.mountains.indexOf(req.params.mountainId);
        if (index > -1) {
            patroller.mountains.splice(index, 1);
        }
        const updatedPatroller = await patroller.save();
        res.status(200).json(updatedPatroller);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};