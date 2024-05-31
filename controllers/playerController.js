// controllers/playerController.js

const Player = require('../models/Player'); // Adjust the path as necessary
const ArcheryPlayer = require('../models/ArcheryPlayer'); // Adjust the path as necessary
const CricketPlayer = require('../models/CricketPlayer'); // Adjust the path as necessary
const ChessPlayer = require('../models/ChessPlayer'); // Adjust the path as necessary

exports.getPlayerDetails = async (req, res) => {
    const playerId = req.params.id;
    try {
        const player = await Player.findById(playerId);
        let isAdmin = false;

        // Check if admin is logged in
        if (req.session && req.session.admin) {
            isAdmin = true;
        }

        if (!player) {
            req.flash('message', "Player Not Found");
            req.flash('messageType', 'danger');
            return res.redirect('/');
        }

        let details = {};
        if (player.sport === "Archery") {
            details = await ArcheryPlayer.findOne({ basicDetails: playerId });
            if (!details) {
                req.flash('message', "Archery player not found");
                req.flash('messageType', 'danger');
                return res.redirect('/');
            }
        } else if (player.sport === "Cricket") {
            details = await CricketPlayer.findOne({ basicDetails: playerId });
            if (!details) {
                req.flash('message', "Cricket Player Not Found");
                req.flash('messageType', 'danger');
                return res.redirect('/');
            }
        } else if (player.sport === "Chess") {
            details = await ChessPlayer.findOne({ basicDetails: playerId });
            if (!details) {
                req.flash('message', "Chess Player Not Found");
                req.flash('messageType', 'danger');
                return res.redirect('/');
            }
        } else {
            req.flash('message', "Sports Not Found");
            req.flash('messageType', 'danger');
            return res.redirect('/');
        }

        res.render('onePlayer', { player, details, isAdmin });
    } catch (error) {
        req.flash('message', "Internal Server Error");
        req.flash('messageType', 'danger');
        return res.redirect('/');
    }
};

exports.getPlayerEditForm = async (req, res) => {
    const playerId = req.params.id;
    try {
        const player = await Player.findById(playerId);

        if (!player) {
            req.flash('message', "Player Not Found");
            req.flash('messageType', 'danger');
            return res.redirect('/');
        }

        let details = {};
        if (player.sport === "Archery") {
            details = await ArcheryPlayer.findOne({ basicDetails: playerId });
        } else if (player.sport === "Cricket") {
            details = await CricketPlayer.findOne({ basicDetails: playerId });
        } else if (player.sport === "Chess") {
            details = await ChessPlayer.findOne({ basicDetails: playerId });
        }

        res.render('editForm', { player, details });
    } catch (error) {
        req.flash('message', "Internal Server Error");
        req.flash('messageType', 'danger');
        return res.redirect('/');
    }
};

exports.updatePlayerDetails = async (req, res) => {
    const playerId = req.params.id;
    const { name, age, gender, sport, totalArrowsShot, bullsEyes, accuracy, runs, wickets, strikeRate, gamesPlayed, gamesWon, ranking } = req.body;

    try {
        // Update basic player details
        const player = await Player.findByIdAndUpdate(playerId, { name, age, gender, sport }, { new: true });

        if (!player) {
            req.flash('message', "Player Not Found");
            req.flash('messageType', 'danger');
            return res.redirect('/');
        }

        // Handle sport-specific details based on the type of player
        if (sport === "Archery") {
            await ArcheryPlayer.findOneAndUpdate(
                { basicDetails: playerId },
                { totalArrowsShot, bullsEyes, accuracy },
                { new: true }
            );
        } else if (sport === "Cricket") {
            await CricketPlayer.findOneAndUpdate(
                { basicDetails: playerId },
                { runs, wickets, strikeRate },
                { new: true }
            );
        } else if (sport === "Chess") {
            await ChessPlayer.findOneAndUpdate(
                { basicDetails: playerId },
                { gamesPlayed, gamesWon, ranking },
                { new: true }
            );
        }

        // If an image was uploaded, you can access it via req.file
        if (req.file) {
            // Process the uploaded image as needed
            console.log('Uploaded image:', req.file);
        }

        req.flash('message', "Player Details Updated Successfully");
        req.flash('messageType', 'success');
        return res.redirect('/');
    } catch (error) {
        req.flash('message', "Internal Server Error");
        req.flash('messageType', 'danger');
        return res.redirect('/');
    }
};

exports.deletePlayer = async (req, res) => {
    const playerId = req.params.id;
    try {
        // Assuming you have a Player model
        const deletedPlayer = await Player.findByIdAndDelete(playerId);

        if (!deletedPlayer) {
            // If player with given ID doesn't exist
            req.flash('message', "Player Not Found");
            req.flash('messageType', 'danger');
            return res.redirect('/');
        }

        // Delete associated player details based on sport
        if (deletedPlayer.sport === "Archery") {
            await ArcheryPlayer.findOneAndDelete({ basicDetails: playerId });
        } else if (deletedPlayer.sport === "Cricket") {
            await CricketPlayer.findOneAndDelete({ basicDetails: playerId });
        } else if (deletedPlayer.sport === "Chess") {
            await ChessPlayer.findOneAndDelete({ basicDetails: playerId });
        }

        // Sending a success response
        req.flash('message', "Player Deleted Successfully");
        req.flash('messageType', 'success');
        res.redirect('/');
    } catch (error) {
        req.flash('message', "Internal Server Error");
        req.flash('messageType', 'danger');
        return res.redirect('/');
    }
};
