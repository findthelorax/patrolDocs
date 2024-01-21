const express = require('express');
const equipmentController = require('./equipmentController');
const router = express.Router();

router
    .route('/:mountainId/equipment')
    .get(equipmentController.getAllEquipments)
    .post(equipmentController.createEquipment);

router
    .route('/:mountainId/equipment/:id')
    .get(equipmentController.getEquipment)
    .patch(equipmentController.updateEquipment)
    .delete(equipmentController.deleteEquipment);

module.exports = router;