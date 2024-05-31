const express = require('express');
const router = express.Router();
const eventController = require('../controllers/showEventController');
const { checkUserOrAdminAuthorization } = require('../middlewares/auth');

// GET request to show events
router.get('/showEvent', checkUserOrAdminAuthorization, eventController.showEvent);

module.exports = router;
