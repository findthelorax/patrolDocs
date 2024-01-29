const { Lift, LiftLineCheck } = require('./liftModel');
const { Mountain } = require('../mountains/mountainModel');

exports.getAllLifts = async (req, res) => {
    try {
        const lifts = await Lift.find({ mountain: req.params.mountainId });
        res.status(200).json(lifts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLift = async (req, res) => {
    try {
        const lift = await Lift.findOne({ _id: req.params.liftId, mountain: req.params.mountainId });
        if (!lift) return res.status(404).json({ message: 'No lift found with this ID' });
        res.status(200).json(lift);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createLift = async (req, res) => {
    try {
        const newLift = new Lift({
            ...req.body,
            mountain: req.params.mountainId,
        });
        const lift = await newLift.save();

        const mountain = await Mountain.findById(req.params.mountainId);
        if (!mountain) return res.status(404).json({ message: 'No mountain found with this ID' });
        mountain.lifts.push(lift._id);
        await mountain.save();

        // If the lift is in an area, create it to the area's lifts array
        if (req.body.area) {
            const area = await Mountain.areas.findById(req.body.area);
            if (!area) return res.status(404).json({ message: 'No area found with this ID' });
            area.lifts.push(lift._id);
            await area.save();
        }

        res.status(201).json(lift);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'A lift with this name already exists' });
        }
        res.status(500).json({ message: err.message });
    }
};

exports.updateLift = async (req, res) => {
    try {
        const updatedLift = await Lift.findByIdAndUpdate(req.params.liftId, req.body, { new: true });
        if (!updatedLift) return res.status(404).json({ message: 'No lift found with this ID' });
        res.status(200).json(updatedLift);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteLift = async (req, res) => {
    try {
        const lift = await Lift.findById(req.params.liftId);
        if (!lift) return res.status(404).json({ message: 'No lift found with this ID' });

        // Find the mountain that contains the lift and remove the lift's reference
        const mountain = await Mountain.findOne({ lifts: lift._id });
        if (mountain) {
            const index = mountain.lifts.indexOf(lift._id);
            if (index > -1) {
                mountain.lifts.splice(index, 1);
                await mountain.save();
            }

            // Find the area that contains the lift and remove the lift's reference
            for (let area of mountain.areas) {
                const index = area.lifts.indexOf(lift._id);
                if (index > -1) {
                    area.lifts.splice(index, 1);
                }
            }
            await mountain.save();
        }

        await Lift.findByIdAndDelete(req.params.liftId);

        res.status(204).json(null);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addLiftToArea = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        if (!mountain) {
            return res.status(404).json({ message: 'No mountain found with this ID' });
        }

        const area = mountain.areas.id(req.params.areaId);
        if (!area || !area.lifts) {
            return res.status(404).json({ message: 'No area found with this ID' });
        }

        if (area.lifts.includes(req.params.liftId)) {
            return res.status(400).json({ message: 'Lift already exists in this area' });
        }

        // Find the lift and create the area to it
        const lift = await Lift.findById(req.params.liftId);
        if (!lift) {
            console.log(`Lift not found with ID: ${req.params.liftId}`);
            return res.status(404).json({ message: 'No lift found with this ID' });
        }
        lift.area = area._id;
        await lift.save();

        area.lifts.push(req.params.liftId);
        await mountain.save();
        res.status(200).json(area);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.removeLiftFromArea = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        const area = mountain.areas.id(req.params.areaId);
        if (!area || !area.lifts) {
            return res.status(404).json({ message: 'No area found with this ID' });
        }
        const index = area.lifts.indexOf(req.params.liftId);
        if (index > -1) {
            area.lifts.splice(index, 1);
        }

        // Find the lift and remove the area from it
        const lift = await Lift.findById(req.params.liftId);
        if (!lift) {
            return res.status(404).json({ message: 'No lift found with this ID' });
        }
        lift.area = null;
        await lift.save();

        await mountain.save();
        res.status(200).json(area);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lift Line Checks
exports.getAllLineChecks = async (req, res) => {
    try {
        const lineChecks = await LiftLineCheck.find();
        res.status(200).json(lineChecks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLineCheck = async (req, res) => {
    try {
        const lineCheck = await LiftLineCheck.findOne({ _id: req.params.lineCheckId, mountain: req.params.mountainId, lift: req.params.liftId }).populate('mountain area lift patroller');
        if (!lineCheck) return res.status(404).json({ message: 'No line check found with this ID' });
        res.status(200).json(lineCheck);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createLineCheck = async (req, res) => {
    try {
        const newLineCheck = new LiftLineCheck({ ...req.body, mountain: req.params.mountainId, lift: req.params.liftId });
        const lineCheck = await newLineCheck.save();
        res.status(201).json(lineCheck);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateLineCheck = async (req, res) => {
    try {
        const updatedLineCheck = await LiftLineCheck.findOneAndUpdate({ _id: req.params.lineCheckId, mountain: req.params.mountainId, lift: req.params.liftId }, req.body, { new: true });
        if (!updatedLineCheck) return res.status(404).json({ message: 'No line check found with this ID' });
        res.status(200).json(updatedLineCheck);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteLineCheck = async (req, res) => {
    try {
        const lineCheck = await LiftLineCheck.findOneAndDelete({ _id: req.params.lineCheckId, mountain: req.params.mountainId, lift: req.params.liftId });
        if (!lineCheck) return res.status(404).json({ message: 'No line check found with this ID' });
        res.status(204).json(null);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};