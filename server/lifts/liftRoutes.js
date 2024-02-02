const express = require('express');
const liftController = require('./liftController');
const router = express.Router({ mergeParams: true });

// Line check routes
router.route('/mountain/:mountainId/lift/:liftId/linecheck')
    .get(liftController.getAllLineChecks)
    .post(liftController.createLineCheck);

router.route('/mountain/:mountainId/lift/:liftId/linecheck/:lineCheckId')
    .get(liftController.getLineCheck)
    .patch(liftController.updateLineCheck)
    .delete(liftController.deleteLineCheck);

// Area routes
router.route('/mountain/:mountainId/lift/:liftId/:areaId')
    .post(liftController.addLiftToArea)
    .delete(liftController.removeLiftFromArea);

// Lift routes
router.route('/mountain/:mountainId/lift')
    .get(liftController.getAllLifts)
    .post(liftController.createLift);

router.route('/mountain/:mountainId/lift/:liftId')
    .get(liftController.getLift)
    .patch(liftController.updateLift)
    .delete(liftController.deleteLift);

module.exports = router;