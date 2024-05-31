// controllers/logoutController.js

exports.logout = (req, res) => {
    if (req.session && (req.session.user || req.session.admin)) {
        req.session.user = null;
        req.session.admin = null; // Also clear admin session if exists
        req.flash('message', 'Logout Successfully');
        req.flash('messageType', 'success');
        res.redirect('/');
    } else {
        console.error('User session not found');
        req.flash('fail', 'Failed to logout');
        req.flash('messageType', 'fail');
        res.status(500).send('Failed to logout');
    }
};
