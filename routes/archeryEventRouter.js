const express = require('express');
const router = express.Router();
const archeryEventController = require('../controllers/archeryEventController');
const { checkAdminAuthorization } = require('../middlewares/auth');

// GET request to render the create archery event page
router.get('/createArcheryEvent', checkAdminAuthorization, archeryEventController.renderCreateArcheryEventPage);

// POST request to create a new archery event
router.post('/createArcheryEvent', archeryEventController.createArcheryEvent);

module.exports = router;
