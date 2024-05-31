const mongoose = require('mongoose');

const chessPlayerSchema = new mongoose.Schema({
    basicDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    gamesPlayed: {
        type: Number
    },
    gamesWon: {
        type: Number
    },
    rating: {
        type: Number
    }
});

module.exports = mongoose.model('ChessPlayer', chessPlayerSchema);
