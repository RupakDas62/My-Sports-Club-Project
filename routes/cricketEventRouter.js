// routers/eventRouter.js

const express = require('express');
const router = express.Router();
const cricketEventController = require('../controllers/cricketEventController');
const { checkAdminAuthorization } = require('../middlewares/auth');

router.get('/createCricketEvent', checkAdminAuthorization, cricketEventController.getCreateCricketEventForm);
router.post('/cricketEvent', cricketEventController.createCricketEvent);

module.exports = router;
