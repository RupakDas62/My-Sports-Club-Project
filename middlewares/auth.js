// middlewares/auth.js

const checkAdminAuthorization = (req, res, next) => {
    if (req.session && req.session.admin) {
        return next();
    } else {
        req.flash('message', 'Unauthorized access');
        req.flash('messageType', 'danger');
        return res.redirect('/');
    }
};

const checkUserOrAdminAuthorization = (req, res, next) => {
    // Check if either user or admin is logged in
    if (!req.session || (!req.session.user && !req.session.admin)) {
        return res.status(401).send('Unauthorized');
    }

    // If user or admin is logged in, proceed to the next middleware
    next();
};

module.exports = { checkAdminAuthorization, checkUserOrAdminAuthorization };
