const CricketEvent = require('../models/CricketEvent');
const ChessEvent = require('../models/ChessEvent');
const ArcheryEvent = require('../models/ArcheryEvent');
const ChessPlayer = require('../models/ChessPlayer');

exports.showEvent = async (req, res) => {
    try {
        const cricketEvents = await CricketEvent.find().populate({
            path: 'teams',
            populate: {
                path: 'players',
                model: 'Player',
            }
        });

        const chessEvents = await ChessEvent.find().populate({
            path: 'pairings.player1 pairings.player2',
            populate: {
                path: 'basicDetails',
                model: 'Player'
            }
        });

        for (let event of chessEvents) {
            if (event.pairings.length === 0) {
                let players = await ChessPlayer.find();
                players = shuffleArray(players);

                const rounds = generateRounds(players);

                event.pairings = rounds.flatMap((round) => round);
                await event.save();
            }
        }

        const archeryEvents = await ArcheryEvent.find();

        res.render('showEvent', {
            cricketEvents,
            chessEvents,
            archeryEvents,
            message: req.flash('message'),
            messageType: req.flash('messageType')
        });
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).send('Internal Server Error');
    }
};
