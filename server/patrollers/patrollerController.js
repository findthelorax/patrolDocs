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
        const patroller = await Patroller.findById(req.params.patrollerId).populate('mountain');
        if (patroller == null) {
            return res.status(404).json({ message: 'Cannot find patroller' });
        }
        res.status(200).json(patroller);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addPatroller = async (req, res) => {
    const patroller = new Patroller(req.body);
    try {
        const newPatroller = await patroller.save();
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
        const updatedPatroller = await Patroller.findByIdAndUpdate(req.params.patrollerId, req.body, { new: true });
        res.status(200).json(updatedPatroller);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePatroller = async (req, res) => {
    try {
        await Patroller.findByIdAndRemove(req.params.patrollerId);
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

exports.getAllLogs = async (req, res) => {
    try {
        const patroller = await Patroller.findById(req.params.patrollerId);
        res.status(200).json(patroller.logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLog = async (req, res) => {
    try {
        const patroller = await Patroller.findById(req.params.patrollerId);
        const log = patroller.logs.id(req.params.logId);
        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }
        res.status(200).json(log);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLogsForDate = async (req, res) => {
    try {
        const date = new Date(req.params.date);
        const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        const patroller = await Patroller.findById(req.params.patrollerId);
        const logs = patroller.logs.filter(log => log.date >= start && log.date < end);
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createLog = async (req, res) => {
    try {
        const patroller = await Patroller.findById(req.params.patrollerId);
        patroller.logs.push(req.body);
        const updatedPatroller = await patroller.save();
        res.status(201).json(updatedPatroller.logs[updatedPatroller.logs.length - 1]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateLog = async (req, res) => {
    try {
        const patroller = await Patroller.findById(req.params.patrollerId);
        const log = patroller.logs.id(req.params.dispatcherId);
        Object.assign(log, req.body);
        updatedPatroller = await patroller.save();
        res.status(200).json(log);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteLog = async (req, res) => {
    try {
        const patroller = await Patroller.findById(req.params.patrollerId);
        patroller.logs.id(req.params.dispatcherId).remove();
        await patroller.save();
        res.status(204).json(null);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};