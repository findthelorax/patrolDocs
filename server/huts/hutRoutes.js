const express = require('express');
const hutController = require('./hutController');
const router = express.Router({ mergeParams: true });

router.route('/mountain/:mountainId/hut')
    .get(hutController.getAllHuts)
    .post(hutController.addHut);

router.route('/mountain/:mountainId/hut/:hutId')
    .get(hutController.getHut)
    .put(hutController.updateHut)
    .delete(hutController.deleteHut);

router.route('/mountain/:mountainId/hut/:hutId/log')
    .get(hutController.getHutLog)
    .post(hutController.addHutLog);

router.route('/mountain/:mountainId/hut/:hutId/log/:logId')
    .get(hutController.getHutLog)
    .put(hutController.updateHutLog)
    .delete(hutController.deleteHutLog);

module.exports = router;