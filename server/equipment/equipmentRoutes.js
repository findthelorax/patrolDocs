const express = require('express');
const equipmentController = require('./equipmentController');
const router = express.Router({ mergeParams: true });

// Equipment log routes
router.route('/mountain/:mountainId/equipment/:equipmentId/log/:logId')
    .get(equipmentController.getEquipmentLog)
    .put(equipmentController.updateEquipmentLog)
    .delete(equipmentController.deleteEquipmentLog);

router.route('/mountain/:mountainId/equipment/:equipmentId/log')
    .get(equipmentController.getEquipmentLogs)
    .post(equipmentController.createEquipmentLog);

router.route('/mountain/:mountainId/equipment/logs')
    .get(equipmentController.getAllEquipmentLogs);

// Equipment routes
router.route('/mountain/:mountainId/equipment/:equipmentId')
    .get(equipmentController.getEquipment)
    .put(equipmentController.updateEquipment)
    .delete(equipmentController.deleteEquipment);

router.route('/mountain/:mountainId/equipment')
    .get(equipmentController.getAllEquipment)
    .post(equipmentController.createEquipment);

module.exports = router;