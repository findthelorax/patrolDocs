const express = require('express');
const patrollerController = require('./patrollerController');
const router = express.Router();

// Dispatcher routes
router.route('/mountain/:mountainId/patroller/dispatcher/logs').get(patrollerController.getAllPatrolDispatcherLogs);

router.route('/mountain/:mountainId/patroller/dispatcher/:date').get(patrollerController.getPatrolDispatcherForDate);

router
	.route('/mountain/:mountainId/patroller/:patrollerId/dispatcher')
	.get(patrollerController.getAllPatrolDispatcherLogs)
	.post(patrollerController.createPatrolDispatcherLog);

router
	.route('/mountain/:mountainId/patroller/:patrollerId/dispatcher/:dispatcherId')
	.get(patrollerController.getPatrolDispatcherLog)
	.patch(patrollerController.updatePatrolDispatcherLog)
	.delete(patrollerController.deletePatrolDispatcherLog);

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
