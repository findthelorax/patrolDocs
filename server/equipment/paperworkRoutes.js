const express = require('express');
const paperworkController = require('./paperworkController');
const router = express.Router();

router
    .route('/:mountainId/paperwork')
    .get(paperworkController.getAllPaperworks)
    .post(paperworkController.createPaperwork);

router
    .route('/:mountainId/paperwork/:id')
    .get(paperworkController.getPaperwork)
    .patch(paperworkController.updatePaperwork)
    .delete(paperworkController.deletePaperwork);

module.exports = router;