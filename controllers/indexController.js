// controllers/homeController.js

const Player = require('../models/Player'); // Adjust the path as necessary

exports.getIndexPage = async (req, res) => {
    try {
        const players = await Player.find();
        const sports = ["Archery", "Chess", "Cricket"]; // Define your sports array here or fetch it from somewhere

        const messages = req.flash('message');
        const messageType = req.flash('messageType'); // 'success' or 'fail'

        res.render('index', {
            user: req.session.user,
            admin: req.session.admin,
            players,
            sports,
            messages,
            messageType: messageType.length ? messageType[0] : null,
            // other variables
        });
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
