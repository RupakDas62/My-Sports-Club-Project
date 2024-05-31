// controllers/eventController.js

const CricketPlayer = require('../models/CricketPlayer');
const Team = require('../models/Team');
const CricketEvent = require('../models/CricketEvent');

const getCreateCricketEventForm = async (req, res) => {
    try {
        const cricketPlayers = await CricketPlayer.find().populate('basicDetails');
        res.render('createCricketEvent', { cricketPlayers, message: req.flash('message'), messageType: req.flash('messageType') });
    } catch (err) {
        console.error('Error fetching players:', err);
        res.status(500).send('Internal Server Error');
    }
};

const createCricketEvent = async (req, res) => {
    try {
        const { eventName, eventDate, team1Name, team2Name, team1Players, team2Players } = req.body;

        // Parse the JSON string arrays
        const parsedTeam1Players = JSON.parse(team1Players);
        const parsedTeam2Players = JSON.parse(team2Players);

        // Create and save team documents
        const team1 = new Team({ name: team1Name, players: parsedTeam1Players });
        const team2 = new Team({ name: team2Name, players: parsedTeam2Players });
        const savedTeam1 = await team1.save();
        const savedTeam2 = await team2.save();

        // Create and save event document
        const event = new CricketEvent({
            name: eventName,
            date: new Date(eventDate),
            teams: [savedTeam1._id, savedTeam2._id] // Storing references to the saved teams
        });

        await event.save();

        req.flash('message', 'Event created successfully');
        req.flash('messageType', 'success');
        res.redirect('/');
    } catch (err) {
        console.error('Error creating event:', err);
        req.flash('message', 'Error creating event');
        req.flash('messageType', 'danger');
        res.redirect('/');
    }
};

module.exports = {
    getCreateCricketEventForm,
    createCricketEvent
};
