const express = require('express');
const trailController = require('./trailController');
const router = express.Router({ mergeParams: true });

router.get('/:mountainId/trail', trailController.getAllTrails);
router.get('/:mountainId/trail/:trailId', trailController.getOneTrail);
router.post('/:mountainId/trail/', trailController.addTrail);
router.put('/:mountainId/trail/:trailId', trailController.updateTrail);
router.delete('/:mountainId/trail/:trailId', trailController.deleteTrail);

module.exports = router;