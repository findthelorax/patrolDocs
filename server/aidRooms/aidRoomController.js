const { AidRoom, AidRoomLog } = require('../aidRooms/aidRoomModel');

exports.getAllAidRooms = async (req, res) => {
    try {
        const aidRooms = await AidRoom.find({ mountain: req.params.mountainId }).populate('equipment').populate('paperwork');
        res.status(200).json(aidRooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAidRoom = async (req, res) => {
    const aidRoom = new AidRoom({
        name: req.body.name,
        mountain: req.params.mountainId,
        area: req.body.area,
        equipment: req.body.equipment,
        paperwork: req.body.paperwork,
        comments: req.body.comments,
    });
    try {
        const newAidRoom = await aidRoom.save();
        res.status(201).json(newAidRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAidRoom = async (req, res) => {
    try {
        const aidRoom = await AidRoom.findById(req.params.aidRoomId).populate('equipment').populate('paperwork');
        if (aidRoom == null) {
            return res.status(404).json({ message: 'Cannot find aid room' });
        }
        res.status(200).json(aidRoom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAidRoom = async (req, res) => {
    try {
        const aidRoom = await AidRoom.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (aidRoom == null) {
            return res.status(404).json({ message: 'Cannot find aid room' });
        }
        res.status(200).json(aidRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAidRoom = async (req, res) => {
    try {
        const aidRoom = await AidRoom.findByIdAndRemove(req.params.id);
        if (aidRoom == null) {
            return res.status(404).json({ message: 'Cannot find aid room' });
        }
        res.status(200).json({ message: 'Deleted Aid Room' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllAidRoomLogs = async (req, res) => {
    try {
        const aidRoomLogs = await AidRoomLog.find({ aidRoom: req.params.id });
        if (!aidRoomLogs) {
            return res.status(404).json({ message: 'No logs found for this aid room' });
        }
        res.status(200).json(aidRoomLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAidRoomLog = async (req, res) => {
    try {
        const aidRoomLog = await AidRoomLog.findById(req.params.logId);
        if (!aidRoomLog) {
            return res.status(404).json({ message: 'No log found with this ID' });
        }
        res.status(200).json(aidRoomLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAidRoomLog = async (req, res) => {
    const aidRoomLog = new AidRoomLog({
        aidRoom: req.params.id,
        paperwork: req.body.paperwork,
        equipmentCheckedLog: req.body.equipmentCheckedLog,
        cleaningLog: req.body.cleaningLog,
    });
    try {
        const newAidRoomLog = await aidRoomLog.save();
        res.status(201).json(newAidRoomLog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateAidRoomLog = async (req, res) => {
    try {
        const aidRoomLog = await AidRoomLog.findByIdAndUpdate(req.params.logId, req.body, { new: true });
        if (aidRoomLog == null) {
            return res.status(404).json({ message: 'Cannot find aid room log' });
        }
        res.status(200).json(aidRoomLog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAidRoomLog = async (req, res) => {
    try {
        const aidRoomLog = await AidRoomLog.findByIdAndRemove(req.params.logId);
        if (aidRoomLog == null) {
            return res.status(404).json({ message: 'Cannot find aid room log' });
        }
        res.status(200).json({ message: 'Deleted Aid Room Log' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};