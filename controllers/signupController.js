// controllers/signupController.js

const bcrypt = require('bcrypt');
const saltRounds = 10; // Adjust this value as needed
const Player = require('../models/Player'); // Adjust the path as necessary
const ArcheryPlayer = require('../models/ArcheryPlayer'); // Adjust the path as necessary
const ChessPlayer = require('../models/ChessPlayer'); // Adjust the path as necessary
const CricketPlayer = require('../models/CricketPlayer'); // Adjust the path as necessary

exports.getSignupPage = async (req, res) => {
    const messages = req.flash('message');
    const messageType = req.flash('messageType');
    res.render('signup', { 
        sports: ["Archery", "Chess", "Cricket"], // Adjust as necessary
        messages,
        messageType: messageType.length ? messageType[0] : null 
    });
};

exports.postSignup = async (req, res) => {
    const { name, age, gender, sport, email, pass1, pass2 } = req.body;

    // Log the received form data for debugging
    console.log('Form data:', req.body);
    console.log('Uploaded file:', req.file);

    // Check if passwords match
    if (pass1 !== pass2) {
        req.flash('message', "Passwords do not match");
        req.flash('messageType', 'danger');
        return res.redirect('/signup');
    }

    // Check if required fields are provided
    if (!name || !age || !gender || !sport || !email || !pass1 || !pass2) {
        req.flash('message', "All fields are required");
        req.flash('messageType', 'danger');
        return res.redirect('/signup');
    }

    // Check if file was uploaded
    if (!req.file) {
        req.flash('message', "Profile image is required");
        req.flash('messageType', 'danger');
        return res.redirect('/signup');
    }

    try {
        // Generate salt and hash password
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(pass1, salt);

        // Create new player object
        const newPlayer = new Player({
            name,
            age,
            gender,
            sport,
            profileImage: req.file.filename,
            email,
            password: hashedPassword
        });

        // Save new player to database
        const savedPlayer = await newPlayer.save();

        // Log success and add sport-specific details
        console.log('Player saved:', savedPlayer);

        if (sport === "Archery") {
            await new ArcheryPlayer({
                basicDetails: savedPlayer._id,
                totalArrowsShot: 0,
                bullsEyes: 0,
                accuracy: 0
            }).save();
        } else if (sport === "Chess") {
            await new ChessPlayer({
                basicDetails: savedPlayer._id,
                gamesPlayed: 0,
                gamesWon: 0,
                rating: 0
            }).save();
        } else if (sport === "Cricket") {
            await new CricketPlayer({
                basicDetails: savedPlayer._id,
                runs: 0,
                wickets: 0,
                strikeRate: 0
            }).save();
        }

        req.flash('message', 'Player Registered Successfully');
        req.flash('messageType', 'success');
        res.redirect('/');
    } catch (error) {
        console.error('Error saving player:', error);
        req.flash('message', 'Internal Server Error');
        req.flash('messageType', 'danger');
        return res.redirect('/signup');
    }
};
