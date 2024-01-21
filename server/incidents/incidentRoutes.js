const express = require('express');
const incidentLogController = require('./incidentLogController');
const router = express.Router();

router
    .route('/')
    .get(incidentLogController.getAllLogs)
    .post(incidentLogController.createLog);

router
    .route('/:incidentLogId')
    .get(incidentLogController.getLog)
    .patch(incidentLogController.updateLog)
    .delete(incidentLogController.deleteLog);

module.exports = router;