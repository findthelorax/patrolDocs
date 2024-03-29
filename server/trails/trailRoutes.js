const express = require('express');
const trailController = require('./trailController');
const router = express.Router({ mergeParams: true });

// Trail routes
router.route('/mountain/:mountainId/trail')
    .get(trailController.getAllTrails)
    .post(trailController.createTrail);

router.route('/mountain/:mountainId/trail/:trailId')
    .get(trailController.getOneTrail)
    .put(trailController.updateTrail)
    .delete(trailController.deleteTrail);

// Trail area routes
router.route('/mountain/:mountainId/trail/:trailId/:areaId')
    .post(trailController.addTrailToArea)
    .delete(trailController.deleteTrailFromArea);

// Trail log routes
router.route('/mountain/:mountainId/trail/:trailId/log')
    .get(trailController.getAllTrailLogs)
    .post(trailController.createTrailLog);

router.route('/mountain/:mountainId/trail/:trailId/log/:logId')
    .get(trailController.getOneTrailLog)
    .put(trailController.updateTrailLog)
    .delete(trailController.deleteTrailLog);

module.exports = router;