const express = require('express');
const hutController = require('./hutController');
const router = express.Router();

router.get('/:mountainId/hut', hutController.getAllHuts);
router.get('/:mountainId/hut/:hutId', hutController.getHut);
router.post('/:mountainId/hut', hutController.addHut);
router.put('/:mountainId/hut/:hutId', hutController.updateHut);
router.delete('/:mountainId/hut/:hutId', hutController.deleteHut);

module.exports = router;