const express = require('express');
const trailController = require('./trailController');
const router = express.Router({ mergeParams: true });

// Trail routes
router.route('/:mountainId/trail')
    .get(trailController.getAllTrails)
    .post(trailController.addTrail);

router.route('/:mountainId/trail/:trailId')
    .get(trailController.getOneTrail)
    .put(trailController.updateTrail)
    .delete(trailController.deleteTrail);

// Trail log routes
router.route('/:mountainId/trail/:trailId/log')
    .get(trailController.getAllTrailLogs)
    .post(trailController.addTrailLog);

router.route('/:mountainId/trail/:trailId/log/:logId')
    .get(trailController.getOneTrailLog)
    .put(trailController.updateTrailLog)
    .delete(trailController.deleteTrailLog);

module.exports = router;