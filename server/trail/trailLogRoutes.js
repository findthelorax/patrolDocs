const express = require('express');
const trailLogController = require('./trailLogController');
const router = express.Router();

router.get('/', trailLogController.getAllTrailLogs);
router.get('/:trailId', trailLogController.getOneTrailLog);
router.post('/', trailLogController.addTrailLog);
router.put('/:trailId', trailLogController.updateTrailLog);
router.delete('/:trailId', trailLogController.deleteTrailLog);

module.exports = router;