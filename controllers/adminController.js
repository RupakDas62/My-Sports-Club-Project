// controllers/adminController.js

const Admin = require('../models/Admin'); // Adjust the path as necessary

exports.getAdminLoginPage = (req, res) => {
    res.render('loginAdmin');
};

exports.postAdminLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const admin = await Admin.findOne({ email });
        if (admin) {
            if (admin.password === password) {
                req.session.admin = {
                    ...admin.toObject(),
                    profilePicUrl: `A`
                };
                req.flash('message', "Admin Verified");
                req.flash('messageType', 'success');
                return res.redirect('/');
            } else {
                req.flash('message', "Admin verification denied");
                req.flash('messageType', 'danger');
                return res.redirect('/admin');
            }
        } else {
            req.flash('message', "You are not an admin");
            req.flash('messageType', 'danger');
            return res.redirect('/admin');
        }
    } catch (error) {
        console.error(error);
        req.flash('message', "Internal Server error");
        req.flash('messageType', 'danger');
        return res.redirect('/admin');
    }
};
