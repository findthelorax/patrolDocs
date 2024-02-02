const express = require('express');
const aidRoomController = require('./aidRoomController');
const router = express.Router();

// Aid Room Log routes
router
    .route('/mountain/:mountainId/aidRoom/:aidRoomId/log/:logId')
    .get(aidRoomController.getAidRoomLog)
    .patch(aidRoomController.updateAidRoomLog)
    .delete(aidRoomController.deleteAidRoomLog);

router
    .route('/mountain/:mountainId/aidRoom/:aidRoomId/log')
    .get(aidRoomController.getAidRoomLogs)
    .post(aidRoomController.createAidRoomLog);

router
    .route('/mountain/:mountainId/aidRoom/logs')
    .get(aidRoomController.getAllAidRoomLogs);

// Aid Room routes
router
    .route('/mountain/:mountainId/aidRoom/:id')
    .get(aidRoomController.getAidRoom)
    .patch(aidRoomController.updateAidRoom)
    .delete(aidRoomController.deleteAidRoom);

router
    .route('/mountain/:mountainId/aidRoom')
    .get(aidRoomController.getAllAidRooms)
    .post(aidRoomController.createAidRoom);

module.exports = router;