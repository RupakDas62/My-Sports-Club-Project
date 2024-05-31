// controllers/chessEventController.js

const ChessPlayer = require('../models/ChessPlayer');
const ChessEvent = require('../models/ChessEvent');

const getCreateChessEventForm = async (req, res) => {
    try {
        const players = await ChessPlayer.find({});
        
        if (players.length < 2) {
            req.flash('message', 'Not enough players to create an event.');
            req.flash('messageType', 'danger');
            return res.redirect('/');
        }

        res.render('createChessEvent', { players });
    } catch (error) {
        req.flash('message', 'Error fetching players');
        req.flash('messageType', 'danger');
        res.redirect('/');
    }
};

const createChessEvent = async (req, res) => {
    try {
        const players = await ChessPlayer.find().populate('basicDetails');

        if (players.length < 2) {
            return res.status(400).send('Not enough players available for the event.');
        }

        if(players.length % 2 !== 0) {
            res.status(404).send('There is odd number of players in our club add one more');
        } 

        let newChessEvent = new ChessEvent({
            name: req.body.name,
            date: req.body.date
        });

        const pairings = generatePairings(players);

        newChessEvent.pairings = pairings.map((pairing, index) => ({
            player1: pairing.player1,
            player2: pairing.player2,
            round: Math.floor(index / 2) + 1
        }));

        console.log(newChessEvent);

        await newChessEvent.save();

        res.status(201).send('Chess event created successfully.');
    } catch (error) {
        console.error('Error creating chess event:', error);
        res.status(500).send('Internal Server Error');
    }
};

function generatePairings(players) {
    players = shuffleArray(players);

    const pairings = [];
    const numPlayers = players.length;

    if (numPlayers % 2 !== 0) {
        const byePlayer = {
            _id: null,
            name: 'Bye'
        };
        players.push(byePlayer);
    }

    for (let round = 0; round < numPlayers - 1; round++) {
        const roundPairings = [];
        for (let i = 0; i < numPlayers / 2; i++) {
            const player1 = players[i];
            const player2 = players[numPlayers - 1 - i];
            roundPairings.push({ player1: player1._id, player2: player2._id, round: round + 1 });
        }
        pairings.push(roundPairings);

        const lastPlayer = players.pop();
        players.splice(1, 0, lastPlayer);
    }

    return pairings.flat();
}



const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

module.exports = {
    getCreateChessEventForm,
    createChessEvent
};
