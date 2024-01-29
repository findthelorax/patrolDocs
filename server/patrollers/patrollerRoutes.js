const express = require('express');
const patrollerController = require('./patrollerController');
const router = express.Router();

// Patroller routes
router.route('/mountain/:mountainId/patroller')
    .get(patrollerController.getAllPatrollers)
    .post(patrollerController.addPatroller);

router.route('/mountain/:mountainId/patroller/:patrollerId')
    .get(patrollerController.getPatroller)
    .put(patrollerController.updatePatroller)
    .delete(patrollerController.deletePatroller);

// Dispatcher routes
router.route('/mountain/:mountainId/patroller/:patrollerId/dispatcher')
    .get(patrollerController.getAllPatrolDispatcherLogs)
    .post(patrollerController.createPatrolDispatcherLog);

router.route('/mountain/:mountainId/patroller/:patrollerId/dispatcher/:dispatcherId')
    .get(patrollerController.getPatrolDispatcherLog)
    .patch(patrollerController.updatePatrolDispatcherLog)
    .delete(patrollerController.deletePatrolDispatcherLog);

router.get('/mountain/:mountainId/patroller/dispatcher/:date', patrollerController.getPatrolDispatcherForDate);

// Mountain routes
router.route('/mountain/:mountainId/patroller/:patrollerId/addMountain/:mountainId')
    .put(patrollerController.addMountainToPatroller);

router.route('/mountain/:mountainId/patroller/:patrollerId/removeMountain/:mountainId')
    .put(patrollerController.removeMountainFromPatroller);

module.exports = router;