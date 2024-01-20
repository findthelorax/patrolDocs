const express = require('express');
const runController = require('./runController');
const router = express.Router({ mergeParams: true });

router.get('/:runId', runController.getAllRuns);
router.get('/:runId', runController.getOneRun);
router.post('/', runController.addRun);
router.put('/:runId', runController.updateRun);
router.delete('/:runId', runController.deleteRun);

module.exports = router;