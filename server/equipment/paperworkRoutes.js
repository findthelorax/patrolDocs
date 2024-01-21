const express = require('express');
const paperworkController = require('./paperworkController');
const router = express.Router();

router
    .route('/')
    .get(paperworkController.getAllPaperworks)
    .post(paperworkController.createPaperwork);

router
    .route('/:id')
    .get(paperworkController.getPaperwork)
    .patch(paperworkController.updatePaperwork)
    .delete(paperworkController.deletePaperwork);

module.exports = router;