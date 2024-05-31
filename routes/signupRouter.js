// routers/signupRouter.js

const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');
const multer = require('multer'); // Import multer for file uploads

// Define your storage strategy and middleware for file uploads using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Adjust the path as necessary
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Define the checkAdminAuthorization middleware directly
const checkAdminAuthorization = (req, res, next) => {
    if (req.session && req.session.admin) {
        return next();
    } else {
        req.flash('message', 'Unauthorized access');
        req.flash('messageType', 'danger');
        return res.redirect('/');
    }
};

router.get('/signup', checkAdminAuthorization, signupController.getSignupPage);
router.post('/signup', upload.single('profileImage'), signupController.postSignup);

module.exports = router;
