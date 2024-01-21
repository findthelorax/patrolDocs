const express = require('express');
const mountainController = require('./mountainController');
const router = express.Router();

router.get('/', mountainController.getAllMountains);
router.get('/:id', mountainController.getMountain);
router.post('/', mountainController.addMountain);
router.put('/:id', mountainController.updateMountain);
router.delete('/:id', mountainController.deleteMountain);

router.get('/:mountainId/areas', mountainController.getAllAreas);
router.get('/:mountainId/areas/:areaId', mountainController.getArea);
router.post('/:mountainId/areas', mountainController.addArea);
router.put('/:mountainId/areas/:areaId', mountainController.updateArea);
router.delete('/:mountainId/areas/:areaId', mountainController.deleteArea);

module.exports = router;