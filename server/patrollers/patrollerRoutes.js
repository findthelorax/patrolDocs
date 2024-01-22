const express = require('express');
const patrollerController = require('./patrollerController');
const router = express.Router();

// Patroller routes
router.route('/')
    .get(patrollerController.getAllPatrollers)
    .post(patrollerController.addPatroller);

router.route('/:patrollerId')
    .get(patrollerController.getPatroller)
    .put(patrollerController.updatePatroller)
    .delete(patrollerController.deletePatroller);

// Dispatcher routes
router.route('/:patrollerId/dispatcher')
    .get(patrollerController.getAllLogs)
    .post(patrollerController.createLog);

router.route('/:patrollerId/dispatcher/:dispatcherId')
    .get(patrollerController.getLog)
    .patch(patrollerController.updateLog)
    .delete(patrollerController.deleteLog);

// Mountain routes
router.route('/:patrollerId/addMountain/:mountainId')
    .put(patrollerController.addMountainToPatroller);

router.route('/:patrollerId/removeMountain/:mountainId')
    .put(patrollerController.removeMountainFromPatroller);

module.exports = router;