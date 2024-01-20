const express = require('express');
const hutController = require('../controllers/hutController');
const router = express.Router();

router.get('/', hutController.getAllHuts);
router.get('/:id', hutController.getHut);
router.post('/', hutController.addHut);
router.put('/:id', hutController.updateHut);
router.delete('/:id', hutController.deleteHut);

module.exports = router;