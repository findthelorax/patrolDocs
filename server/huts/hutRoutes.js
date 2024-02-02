const express = require('express');
const hutController = require('./hutController');
const router = express.Router({ mergeParams: true });

// Hut log routes
router.route('/mountain/:mountainId/hut/:hutId/log/:logId')
    .get(hutController.getHutLog)
    .put(hutController.updateHutLog)
    .delete(hutController.deleteHutLog);

router.route('/mountain/:mountainId/hut/:hutId/log')
    .get(hutController.getHutLogs)
    .post(hutController.createHutLog);

router.route('/mountain/:mountainId/hut/logs')
    .get(hutController.getAllHutLogs);

// Hut routes
router.route('/mountain/:mountainId/hut/:hutId')
    .get(hutController.getHut)
    .put(hutController.updateHut)
    .delete(hutController.deleteHut);

router.route('/mountain/:mountainId/hut')
    .get(hutController.getAllHuts)
    .post(hutController.createHut);

module.exports = router;