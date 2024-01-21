const express = require('express');
const liftController = require('./liftController');
const lineCheckController = require('./lineCheckController');
const router = express.Router({ mergeParams: true });

router
    .route('/:mountainId/lift')
    .get(liftController.getAllLifts)
    .post(liftController.createLift);

router
    .route('/:mountainId/lift/:id')
    .get(liftController.getLift)
    .patch(liftController.updateLift)
    .delete(liftController.deleteLift);

router
    .route('/:mountainId/lift/:id/linecheck')
    .get(lineCheckController.getAllLineChecks)
    .post(lineCheckController.createLineCheck);

router
    .route('/:mountainId/lift/:id/linecheck/:lineCheckId')
    .get(lineCheckController.getLineCheck)
    .patch(lineCheckController.updateLineCheck)
    .delete(lineCheckController.deleteLineCheck);

module.exports = router;