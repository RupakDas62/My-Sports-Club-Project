// routers/adminRouter.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin', adminController.getAdminLoginPage);
router.post('/admin', adminController.postAdminLogin);

module.exports = router;
