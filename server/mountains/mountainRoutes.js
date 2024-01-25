const express = require('express');
const mountainController = require('./mountainController');
const router = express.Router();

// Mountain routes
router.route('/')
    .get(mountainController.getAllMountains)
    .post(mountainController.addMountain);

router.route('/:mountainId')
    .get(mountainController.getMountain)
    .put(mountainController.updateMountain)
    .delete(mountainController.deleteMountain);

// Area routes
router.route('/:mountainId/areas')
    .get(mountainController.getAllAreas)
    .post(mountainController.createArea);

router.route('/:mountainId/areas/:areaId')
    .get(mountainController.getArea)
    .put(mountainController.updateArea)
    .delete(mountainController.deleteArea);

module.exports = router;