const express = require('express');
const liftController = require('./liftController');
const router = express.Router({ mergeParams: true });

router
    .route('/:mountainId/lift')
    .get(liftController.getAllLifts)
    .post(liftController.createLift);

router
    .route('/:mountainId/lift/:liftId')
    .get(liftController.getLift)
    .patch(liftController.updateLift)
    .delete(liftController.deleteLift);

router
    .route('/:mountainId/lift/:liftId/linecheck')
    .get(liftController.getAllLineChecks)
    .post(liftController.createLineCheck);

router
    .route('/:mountainId/lift/:liftId/linecheck/:lineCheckId')
    .get(liftController.getLineCheck)
    .patch(liftController.updateLineCheck)
    .delete(liftController.deleteLineCheck);

router
    .route('/:mountainId/lift/:liftId/:areaId')
    .post(liftController.addLiftToArea)
    .delete(liftController.removeLiftFromArea);

module.exports = router;