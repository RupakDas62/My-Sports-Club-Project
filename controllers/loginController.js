// controllers/loginController.js

const bcrypt = require('bcrypt');
const Player = require('../models/Player'); // Adjust the path as necessary

exports.getLoginPage = (req, res) => {
    const messages = req.flash('message');
    const messageType = req.flash('messageType');
    res.render('login', {
        messages,
        messageType: messageType.length ? messageType[0] : null
    });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const player = await Player.findOne({ email });
        if (player) {
            console.log(player);
            const isMatch = await bcrypt.compare(password, player.password);
            if (isMatch) {
                req.session.user = {
                    ...player.toObject(),
                    profilePicUrl: `/uploads/${player.profileImage}`,
                };
                req.flash('message', 'Login Successfully');
                req.flash('messageType', 'success');
                return res.redirect('/');
            } else {
                req.flash('message', "Incorrect Username or Password");
                req.flash('messageType', 'danger');
                return res.redirect('/login');
            }
        } else {
            req.flash('message', "Incorrect Username or Password");
            req.flash('messageType', 'danger');
            return res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        req.flash('fail', 'Internal server error');
        return res.redirect('/login');
    }
};
