const express = require('express');
const incidentLogController = require('./incidentLogController');
const router = express.Router();

router
    .route('/:mountainId/incident')
    .get(incidentLogController.getAllLogs)
    .post(incidentLogController.createLog);

router
    .route('/:mountainId/incident/:incidentLogId')
    .get(incidentLogController.getLog)
    .patch(incidentLogController.updateLog)
    .delete(incidentLogController.deleteLog);

module.exports = router;