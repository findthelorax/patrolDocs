const express = require('express');
const lodgeController = require('./lodgeController');
const router = express.Router({ mergeParams: true });

// Lodge routes
router.route('/mountain/:mountainId/lodge')
    .get(lodgeController.getAllLodges)
    .post(lodgeController.createLodge);

router.route('/mountain/:mountainId/lodge/:lodgeId')
    .get(lodgeController.getLodge)
    .put(lodgeController.updateLodge)
    .delete(lodgeController.deleteLodge);

module.exports = router;