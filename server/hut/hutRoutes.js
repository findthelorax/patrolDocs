const express = require('express');
const hutController = require('./hutController');
const router = express.Router();

router.get('/:mountainId/hut', hutController.getAllHuts);
router.get('/:mountainId/hut/:id', hutController.getHut);
router.post('/:mountainId/hut', hutController.addHut);
router.put('/:mountainId/hut/:id', hutController.updateHut);
router.delete('/:mountainId/hut/:id', hutController.deleteHut);

module.exports = router;