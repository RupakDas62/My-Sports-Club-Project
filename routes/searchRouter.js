// routers/searchRouter.js

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { checkUserOrAdminAuthorization } = require('../middlewares/auth');

router.get('/search', checkUserOrAdminAuthorization, searchController.searchPlayer);

module.exports = router;
