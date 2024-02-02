const express = require('express');
const trailController = require('./trailController');
const router = express.Router({ mergeParams: true });

// Trail log routes
router.route('/mountain/:mountainId/trail/logs')
    .get(trailController.getAllTrailLogs);

router.route('/mountain/:mountainId/trail/:trailId/log')
    .get(trailController.getTrailLogs)
    .post(trailController.createTrailLog);

router.route('/mountain/:mountainId/trail/:trailId/log/:logId')
    .get(trailController.getOneTrailLog)
    .put(trailController.updateTrailLog)
    .delete(trailController.deleteTrailLog);

// Trail area routes
router.route('/mountain/:mountainId/trail/:trailId/:areaId')
    .post(trailController.addTrailToArea)
    .delete(trailController.deleteTrailFromArea);

// Trail routes
router.route('/mountain/:mountainId/trail')
    .get(trailController.getAllTrails)
    .post(trailController.createTrail);

router.route('/mountain/:mountainId/trail/:trailId')
    .get(trailController.getOneTrail)
    .put(trailController.updateTrail)
    .delete(trailController.deleteTrail);

module.exports = router;