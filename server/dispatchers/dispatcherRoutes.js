const express = require('express');
const dispatcherController = require('./dispatcherController');
const router = express.Router();

// Dispatcher routes
router.route('/mountain/:mountainId/dispatcher/:date').get(dispatcherController.getDispatcherForDate);

router
	.route('/mountain/:mountainId/dispatcher')
	.get(dispatcherController.getAllDispatcherLogs)
	.post(dispatcherController.createDispatcherLog);

router
	.route('/mountain/:mountainId/dispatcher/:dispatcherLogId')
	.get(dispatcherController.getDispatcherLog)
	.put(dispatcherController.updateDispatcherLog)
	.delete(dispatcherController.deleteDispatcherLog);

module.exports = router;
