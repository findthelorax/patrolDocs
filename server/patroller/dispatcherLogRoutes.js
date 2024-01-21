const express = require('express');
const dispatcherLogController = require('./dispatcherLogController');
const router = express.Router();

router
    .route('/:patrollerId/dispatcher')
    .get(dispatcherLogController.getAllLogs)
    .post(dispatcherLogController.createLog);

router
    .route('/:patrollerId/dispatcher/:id')
    .get(dispatcherLogController.getLog)
    .patch(dispatcherLogController.updateLog)
    .delete(dispatcherLogController.deleteLog);

module.exports = router;