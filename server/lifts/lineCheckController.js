const { Lift, LineCheck } = require('./liftModel');

exports.getAllLineChecks = async (req, res) => {
    try {
        const lineChecks = await LineCheck.find();
        res.status(200).json(lineChecks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLineCheck = async (req, res) => {
    try {
        const lineCheck = await LineCheck.findOne({ _id: req.params.lineCheckId, mountain: req.params.mountainId, lift: req.params.liftId }).populate('mountain area lift patroller');
        if (!lineCheck) return res.status(404).json({ message: 'No line check found with this ID' });
        res.status(200).json(lineCheck);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createLineCheck = async (req, res) => {
    try {
        const newLineCheck = new LineCheck({ ...req.body, mountain: req.params.mountainId, lift: req.params.liftId });
        const lineCheck = await newLineCheck.save();

        // Find the lift and add the new line check to its lineChecks array
        const lift = await Lift.findById(liftId);
        lift.lineChecks.push(lineCheck._id);
        await lift.save();

        res.status(201).json(lineCheck);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateLineCheck = async (req, res) => {
    try {
        const updatedLineCheck = await LineCheck.findOneAndUpdate({ _id: req.params.lineCheckId, mountain: req.params.mountainId, lift: req.params.liftId }, req.body, { new: true });
        if (!updatedLineCheck) return res.status(404).json({ message: 'No line check found with this ID' });
        res.status(200).json(updatedLineCheck);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteLineCheck = async (req, res) => {
    try {
        const lineCheck = await LineCheck.findOneAndDelete({ _id: req.params.lineCheckId, mountain: req.params.mountainId, lift: req.params.liftId });
        if (!lineCheck) return res.status(404).json({ message: 'No line check found with this ID' });
        res.status(204).json(null);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};