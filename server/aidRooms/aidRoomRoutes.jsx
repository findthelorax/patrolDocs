const express = require('express');
const aidRoomController = require('./aidRoomController');
const router = express.Router();

router
    .route('/mountain/:mountainId/aidRoom')
    .get(aidRoomController.getAllAidRooms)
    .post(aidRoomController.createAidRoom);

router
    .route('/mountain/:mountainId/aidRoom/:id')
    .get(aidRoomController.getAidRoom)
    .patch(aidRoomController.updateAidRoom)
    .delete(aidRoomController.deleteAidRoom);

router
    .route('/mountain/:mountainId/aidRoom/:aidRoomId/log')
    .get(aidRoomController.getAllAidRoomLogs)
    .post(aidRoomController.createAidRoomLog);

router
    .route('/mountain/:mountainId/aidRoom/:aidRoomId/log/:logId')
    .get(aidRoomController.getAidRoomLog)
    .patch(aidRoomController.updateAidRoomLog)
    .delete(aidRoomController.deleteAidRoomLog);

module.exports = router;