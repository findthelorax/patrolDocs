const express = require('express');
const equipmentController = require('./equipmentController');
const router = express.Router();

router
    .route('/mountain/:mountainId/equipment')
    .get(equipmentController.getAllEquipments)
    .post(equipmentController.createEquipment);

router
    .route('/mountain/:mountainId/equipment/:id')
    .get(equipmentController.getEquipment)
    .patch(equipmentController.updateEquipment)
    .delete(equipmentController.deleteEquipment);

router
    .route('/mountain/:mountainId/equipment/:equipmentId/log')
    .get(equipmentController.getAllEquipmentLogs)
    .post(equipmentController.createEquipmentLog);

router
    .route('/mountain/:mountainId/equipment/:equipmentId/log/:logId')
    .get(equipmentController.getEquipmentLog)
    .patch(equipmentController.updateEquipmentLog)
    .delete(equipmentController.deleteEquipmentLog);

module.exports = router;