const express = require('express');
const trailLogController = require('./trailLogController');
const router = express.Router();

router.get('/', trailLogController.getAllTrailLogs);
router.get('/:id', trailLogController.getOneTrailLog);
router.post('/', trailLogController.addTrailLog);
router.put('/:id', trailLogController.updateTrailLog);
router.delete('/:id', trailLogController.deleteTrailLog);

module.exports = router;