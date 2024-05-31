// routers/chessEventRouter.js

const express = require('express');
const router = express.Router();
const chessEventController = require('../controllers/chessEventController');
const { checkAdminAuthorization } = require('../middlewares/auth');

router.get('/createChessEvent', checkAdminAuthorization, chessEventController.getCreateChessEventForm);
router.post('/createChessEvent', chessEventController.createChessEvent);

module.exports = router;
