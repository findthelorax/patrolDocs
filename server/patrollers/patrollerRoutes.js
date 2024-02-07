const express = require('express');
const patrollerController = require('./patrollerController');
const router = express.Router();

// Mountain routes
router
	.route('/mountain/:mountainId/patroller/:patrollerId/addMountain/:mountainId')
	.put(patrollerController.addMountainToPatroller);

router
	.route('/mountain/:mountainId/patroller/:patrollerId/removeMountain/:mountainId')
	.put(patrollerController.removeMountainFromPatroller);

// Patroller routes
router
	.route('/mountain/:mountainId/patroller')
	.get(patrollerController.getAllPatrollers)
	.post(patrollerController.createPatroller);

router
	.route('/mountain/:mountainId/patroller/:patrollerId')
	.get(patrollerController.getPatroller)
	.put(patrollerController.updatePatroller)
	.delete(patrollerController.deletePatroller);

module.exports = router;
