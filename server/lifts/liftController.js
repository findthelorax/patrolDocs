const { Lift } = require('./liftModel');
const { Mountain, Area } = require('../mountain/mountainModel');

exports.getAllLifts = async (req, res) => {
    try {
        const lifts = await Lift.find();
        res.status(200).json(lifts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLift = async (req, res) => {
    try {
        const lift = await Lift.findById(req.params.liftId);
        if (!lift) return res.status(404).json({ message: 'No lift found with this ID' });
        res.status(200).json(lift);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createLift = async (req, res) => {
    try {
        // Create a new lift
        const newLift = new Lift({
            ...req.body,
            mountain: req.params.mountainId,  // Use the mountainId from the URL
        });
        const lift = await newLift.save();

        const mountain = await Mountain.findById(req.params.mountainId);
        if (!mountain) return res.status(404).json({ message: 'No mountain found with this ID' });
        mountain.lifts.push(lift._id);
        await mountain.save();

        // If the lift is in an area, add it to the area's lifts array
        if (req.body.area) {
            const area = await Area.findById(req.body.area);
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
        }

        // Find the area that contains the lift and remove the lift's reference
        const area = await Area.findOne({ lifts: lift._id });
        if (area) {
            const index = area.lifts.indexOf(lift._id);
            if (index > -1) {
                area.lifts.splice(index, 1);
                await area.save();
            }
        }

        // Delete the lift
        await Lift.findByIdAndDelete(req.params.liftId);

        res.status(204).json(null);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addLiftToMountain = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        mountain.lifts.push(req.body.liftId);
        await mountain.save();
        res.status(200).json(mountain);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addLiftToArea = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        const area = mountain.areas.id(req.params.areaId);

        if (area.lifts.includes(req.body.liftId)) {
            return res.status(400).json({ message: 'Lift already exists in this area' });
        }

        area.lifts.push(req.body.liftId);
        await mountain.save();
        res.status(200).json(mountain);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.moveLiftToArea = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        const index = mountain.lifts.indexOf(req.body.liftId);
        if (index > -1) {
            mountain.lifts.splice(index, 1);
        }
        const area = mountain.areas.id(req.params.areaId);

        if (area.lifts.includes(req.body.liftId)) {
            return res.status(400).json({ message: 'Lift already exists in this area' });
        }

        area.lifts.push(req.body.liftId);
        await mountain.save();
        res.status(200).json(mountain);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.removeLiftFromArea = async (req, res) => {
    try {
        const mountain = await Mountain.findById(req.params.mountainId);
        const area = mountain.areas.id(req.params.areaId);
        const index = area.lifts.indexOf(req.body.liftId);
        if (index > -1) {
            area.lifts.splice(index, 1);
        }
        await mountain.save();
        res.status(200).json(mountain);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};