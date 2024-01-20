const express = require('express');
const mountainController = require('../controllers/mountainController');
const router = express.Router();

router.get('/', mountainController.getAllMountains);
router.get('/:id', mountainController.getMountain);
router.post('/', mountainController.addMountain);
router.put('/:id', mountainController.updateMountain);
router.delete('/:id', mountainController.deleteMountain);

module.exports = router;