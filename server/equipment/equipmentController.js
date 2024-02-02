const { Equipment, EquipmentLog } = require('./equipmentModel');

exports.getAllEquipment = async (req, res) => {
    try {
        const equipments = await Equipment.find().populate('checkLog.checkedBy');
        res.status(200).json(equipments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.equipmentId).populate('checkLog.checkedBy');
        if (!equipment) return res.status(404).json({ message: 'No equipment found with this ID' });
        res.status(200).json(equipment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createEquipment = async (req, res) => {
    const equipment = new Equipment(req.body);
    try {
        const newEquipment = await equipment.save();
        res.status(201).json(newEquipment);
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: 'Equipment idNumber must be unique' });
        } else {
            res.status(400).json({ message: err.message });
        }
    }
};

exports.updateEquipment = async (req, res) => {
    try {
        const updatedEquipment = await Equipment.findByIdAndUpdate(req.params.equipmentId, req.body, { new: true });
        if (!updatedEquipment) return res.status(404).json({ message: 'No equipment found with this ID' });
        res.status(200).json(updatedEquipment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findByIdAndDelete(req.params.equipmentId);
        if (!equipment) return res.status(404).json({ message: 'No equipment found with this ID' });
        res.status(204).json(null);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllEquipmentLogs = async (req, res) => {
    try {
        const equipmentLogs = await EquipmentLog.find();
        if (!equipmentLogs) {
            return res.status(404).json({ message: 'No logs found' });
        }
        res.status(200).json(equipmentLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getEquipmentLogs = async (req, res) => {
    try {
        const equipmentLogs = await EquipmentLog.find({ equipment: req.params.equipmentId });
        if (!equipmentLogs) {
            return res.status(404).json({ message: 'No logs found for this equipment' });
        }
        res.status(200).json(equipmentLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEquipmentLog = async (req, res) => {
    try {
        const log = await EquipmentLog.findById(req.params.logId);
        if (log) {
            res.status(200).json(log);
        } else {
            res.status(404).json({ message: 'Log not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createEquipmentLog = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.equipmentId);
        if (equipment) {
            const log = new EquipmentLog({ ...req.body, equipment: equipment._id });
            const savedLog = await log.save();
            equipment.checkLog = savedLog._id;
            await equipment.save();
            res.status(201).json(savedLog);
        } else {
            res.status(404).json({ message: 'Equipment not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateEquipmentLog = async (req, res) => {
    try {
        const updatedLog = await EquipmentLog.findByIdAndUpdate(req.params.logId, req.body, { new: true });
        if (updatedLog) {
            res.status(200).json(updatedLog);
        } else {
            res.status(404).json({ message: 'Log not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteEquipmentLog = async (req, res) => {
    try {
        const log = await EquipmentLog.findByIdAndDelete(req.params.logId);
        if (log) {
            res.status(204).json(null);
        } else {
            res.status(404).json({ message: 'Log not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};