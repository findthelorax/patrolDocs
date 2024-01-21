const express = require('express');
const patrollerController = require('./patrollerController');
const router = express.Router();

router.get('/', patrollerController.getAllPatrollers);
router.get('/:patrollerId', patrollerController.getPatroller);
router.post('/', patrollerController.addPatroller);
router.put('/:patrollerId', patrollerController.updatePatroller);
router.delete('/:patrollerId', patrollerController.deletePatroller);

router.put('/:patrollerId/addMountain/:mountainId', patrollerController.addMountainToPatroller);
router.put('/:patrollerId/removeMountain/:mountainId', patrollerController.removeMountainFromPatroller);

module.exports = router;