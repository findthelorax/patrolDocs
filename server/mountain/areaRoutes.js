const express = require('express');
const areaController = require('../controllers/areaController');
const router = express.Router({ mergeParams: true });

router.get('/', areaController.getAllAreas);
router.get('/:areaId', areaController.getArea);
router.post('/', areaController.addArea);
router.put('/:areaId', areaController.updateArea);
router.delete('/:areaId', areaController.deleteArea);

module.exports = router;