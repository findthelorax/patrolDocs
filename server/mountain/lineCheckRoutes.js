const express = require('express');
const lineCheckController = require('../controllers/lineCheckController');
const router = express.Router();

router.get('/', lineCheckController.getAllLineChecks);
router.get('/:id', lineCheckController.getLineCheck);
router.post('/', lineCheckController.addLineCheck);
router.put('/:id', lineCheckController.updateLineCheck);
router.delete('/:id', lineCheckController.deleteLineCheck);

module.exports = router;