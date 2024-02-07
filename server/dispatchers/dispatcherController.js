const { DispatcherLog } = require('./dispatcherModel');

exports.getAllDispatcherLogs = async (req, res) => {
    try {
        const logs = await DispatcherLog.find({ mountain: req.params.mountainId });
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOneDispatcherLogs = async (req, res) => {
    try {
        console.log('Patroller ID:', req.params.patrollerId); // Debug line
        const logs = await DispatcherLog.find({ patroller: req.params.patrollerId });
        console.log('Logs:', logs); // Debug line
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDispatcherLog = async (req, res) => {
    try {
        const log = await DispatcherLog.findById(req.params.dispatcherLogId);
        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }
        res.status(200).json(log);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDispatcherForDate = async (req, res) => {
    try {
        const date = new Date(req.params.date);
        const start = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
        const end = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1));
        const dispatcher = await DispatcherLog.findOne({
            mountain: req.params.mountainId,
            date: { $gte: start, $lt: end }
        }).populate('patroller');
        if (dispatcher) {
            res.status(200).json(dispatcher);
        } else {
            res.status(200).json({ 
                message: 'No patrol dispatcher found.',
                date: start.toISOString()
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createDispatcherLog = async (req, res) => {
    try {
        // Split the date string into year, month, and day
        const [year, month, day] = req.body.date.split('-');

        // Create a new Date object in UTC
        let date = new Date(Date.UTC(year, month - 1, day));

        const patrolDispatcherLog = new DispatcherLog({
            mountain: req.params.mountainId,
            patroller: req.body.patrollerId,
            date: date
        });

        const savedPatrolDispatcherLog = await patrolDispatcherLog.save();
        const populatedPatrolDispatcherLog = await DispatcherLog.populate(savedPatrolDispatcherLog, { path: 'patroller' });
        res.json(populatedPatrolDispatcherLog);
    } catch (error) {
        console.error(`Error creating patrol dispatcher log.`, error);
        res.status(500).send(error);
    }
};

exports.updateDispatcherLog = async (req, res) => {
    try {
        const { mountainId, dispatcherLogId } = req.params;
        const patrolDispatcherLog = await DispatcherLog.findOne({ mountain: mountainId, _id: dispatcherLogId });

        if (!patrolDispatcherLog) {
            return res.status(404).json({ message: 'Patrol Dispatcher Log not found' });
        }

        patrolDispatcherLog.patroller = req.body.patrollerId; // Get newPatrollerId from req.body
        await patrolDispatcherLog.save();

        res.status(200).json({ message: 'Patrol Dispatcher Log updated successfully' });
    } catch (error) {
        console.error(`Error updating Patrol Dispatcher Log: ${error}`);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteDispatcherLog = async (req, res) => {
    try {
        await DispatcherLog.findByIdAndRemove(req.params.logId);
        res.status(204).json(null);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};