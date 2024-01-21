const Equipment = require('./equipmentModel');

exports.getAllEquipments = async (req, res) => {
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