// controllers/searchController.js

const Player = require('../models/Player'); // Adjust the path as necessary
const ArcheryPlayer = require('../models/ArcheryPlayer'); // Adjust the path as necessary
const CricketPlayer = require('../models/CricketPlayer'); // Adjust the path as necessary
const ChessPlayer = require('../models/ChessPlayer'); // Adjust the path as necessary

exports.searchPlayer = async (req, res) => {
    const query = req.query.query;

    try {
        // Find the player based on the search query
        const player = await Player.findOne({ name: query });

        if (!player) {
            req.flash('message', 'Player Not Found');
            req.flash('messageType', 'danger');
            return res.redirect('/');
        }

        // Get the details of the player based on their sport
        let details;
        if (player.sport === "Archery") {
            details = await ArcheryPlayer.findOne({ basicDetails: player._id });
        } else if (player.sport === "Cricket") {
            details = await CricketPlayer.findOne({ basicDetails: player._id });
        } else if (player.sport === "Chess") {
            details = await ChessPlayer.findOne({ basicDetails: player._id });
        }

        // Check if admin is logged in
        const isAdmin = req.session && req.session.admin;

        // Render the onePlayer.ejs template with the player and details
        res.render('onePlayer', { player, details, isAdmin });
    } catch (error) {
        req.flash('message', 'Internal Server Error');
        req.flash('messageType', 'danger');
        return res.redirect('/');
    }
};
