const express = require('express');
const mountainController = require('./mountainController');
const router = express.Router();

router.get('/', mountainController.getAllMountains);
router.get('/:mountainId', mountainController.getMountain);
router.post('/', mountainController.addMountain);
router.put('/:mountainId', mountainController.updateMountain);
router.delete('/:mountainId', mountainController.deleteMountain);

router.get('/:mountainId/areas', mountainController.getAllAreas);
router.get('/:mountainId/areas/:areaId', mountainController.getArea);
router.post('/:mountainId/areas', mountainController.addArea);
router.put('/:mountainId/areas/:areaId', mountainController.updateArea);
router.delete('/:mountainId/areas/:areaId', mountainController.deleteArea);

module.exports = router;