const express = require('express');
const patrollerController = require('./patrollerController');
const router = express.Router();

router.get('/', patrollerController.getAllPatrollers);
router.get('/:id', patrollerController.getPatroller);
router.post('/', patrollerController.addPatroller);
router.put('/:id', patrollerController.updatePatroller);
router.delete('/:id', patrollerController.deletePatroller);

router.put('/:id/addMountain/:mountainId', patrollerController.addMountainToPatroller);
router.put('/:id/removeMountain/:mountainId', patrollerController.removeMountainFromPatroller);

module.exports = router;