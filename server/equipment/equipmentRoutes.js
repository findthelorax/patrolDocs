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

router
    .route('/:mountainId/equipment/:equipmentId/log')
    .get(equipmentController.getEquipmentLog)
    .post(equipmentController.addEquipmentLog);

router
    .route('/:mountainId/equipment/:equipmentId/log/:logId')
    .get(equipmentController.getEquipmentLog)
    .patch(equipmentController.updateEquipmentLog)
    .delete(equipmentController.deleteEquipmentLog);

module.exports = router;