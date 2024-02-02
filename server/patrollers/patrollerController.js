const { Patroller, PatrolDispatcherLog } = require('./patrollerModel');
const { Mountain } = require('../mountains/mountainModel');

exports.getAllPatrollers = async (req, res) => {
    try {
        const patrollers = await Patroller.find();
        res.status(200).json(patrollers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPatroller = async (req, res) => {
    try {
        const patroller = await Patroller.findById(req.params.patrollerId);
        if (patroller == null) {
            return res.status(404).json({ message: 'Cannot find patroller' });
        }
        res.status(200).json(patroller);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPatroller = async (req, res) => {
    const patroller = new Patroller(req.body);
    try {
        const newPatroller = await patroller.save();

        const mountain = await Mountain.findById(req.params.mountainId);
        if (!mountain) {
            return res.status(404).json({ message: 'Mountain not found' });
        }
        mountain.patrollers.push(newPatroller._id);
        await mountain.save();

        res.status(201).json(newPatroller);
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: 'A patroller with the same first and last name already exists' });
        } else {
            res.status(400).json({ message: err.message });
        }
    }
};

exports.updatePatroller = async (req, res) => {
    try {
        const patroller = await Patroller.findById(req.params.patrollerId);
        const oldMountains = patroller.mountains;
        const updatedPatroller = await Patroller.findByIdAndUpdate(req.params.patrollerId, req.body, { new: true });

        // Remove the patroller from the old mountains
        await Promise.all(oldMountains.map(async (mountainId) => {
            const mountain = await Mountain.findById(mountainId);
            const index = mountain.patrollers.indexOf(patroller._id);
            if (index > -1) {
                mountain.patrollers.splice(index, 1);
            }
            await mountain.save();
        }));

        // Add the patroller to the new mountains
        await Promise.all(updatedPatroller.mountains.map(async (mountainId) => {
            const mountain = await Mountain.findById(mountainId);
            mountain.patrollers.push(updatedPatroller._id);
            await mountain.save();
        }));

        res.status(200).json(updatedPatroller);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePatroller = async (req, res) => {
    try {
        const patroller = await Patroller.findById(req.params.patrollerId);
        const mountains = patroller.mountains;

        // Remove the patroller from all mountains
        await Promise.all(mountains.map(async (mountainId) => {
            const mountain = await Mountain.findById(mountainId);
            const index = mountain.patrollers.indexOf(patroller._id);
            if (index > -1) {
                mountain.patrollers.splice(index, 1);
            }
            await mountain.save();
        }));

        await Patroller.findByIdAndDelete(req.params.patrollerId);
        res.status(200).json({ message: 'Deleted Patroller' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addMountainToPatroller = async (req, res) => {
    try {
        const patroller = await Patroller.findById(req.params.patrollerId);
        patroller.mountains.push(req.params.mountainId);
        const updatedPatroller = await patroller.save();
        res.status(200).json(updatedPatroller);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.removeMountainFromPatroller = async (req, res) => {
    try {
        const patroller = await Patroller.findById(req.params.patrollerId);
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

exports.getAllPatrolDispatcherLogs = async (req, res) => {
    try {
        const logs = await PatrolDispatcherLog.find({ mountain: req.params.mountainId });
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPatrolDispatcherLogs = async (req, res) => {
    try {
        const logs = await PatrolDispatcherLog.find({ patroller: req.params.patrollerId });
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPatrolDispatcherLog = async (req, res) => {
    try {
        const log = await PatrolDispatcherLog.findById(req.params.logId);
        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }
        res.status(200).json(log);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPatrolDispatcherForDate = async (req, res) => {
    try {
        const date = new Date(req.params.date);
        const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        const dispatcher = await PatrolDispatcherLog.find({
            mountain: req.params.mountainId,
            date: { $gte: start, $lt: end }
        }).populate('patroller');
        res.status(200).json(dispatcher);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPatrolDispatcherLog = async (req, res) => {

    try {
        const log = new PatrolDispatcherLog({ mountain: req.params.mountainId, patroller: req.params.patrollerId, ...req.body.date});
        const savedLog = await log.save();
        res.status(201).json(savedLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updatePatrolDispatcherLog = async (req, res) => {
    try {
        const updatedLog = await PatrolDispatcherLog.findByIdAndUpdate(req.params.logId, req.body, { new: true });
        res.status(200).json(updatedLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePatrolDispatcherLog = async (req, res) => {
    try {
        await PatrolDispatcherLog.findByIdAndRemove(req.params.logId);
        res.status(204).json(null);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};