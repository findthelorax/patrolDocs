const express = require('express');
const runLogController = require('./runLogController');
const router = express.Router();

router.get('/', runLogController.getAllRunLogs);
router.get('/:id', runLogController.getOneRunLog);
router.post('/', runLogController.addRunLog);
router.put('/:id', runLogController.updateRunLog);
router.delete('/:id', runLogController.deleteRunLog);

module.exports = router;