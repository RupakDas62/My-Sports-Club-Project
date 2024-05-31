const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chessEventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    pairings: [{
        player1: {
            type: Schema.Types.ObjectId,
            ref: 'ChessPlayer',
            required: true
        },
        player2: {
            type: Schema.Types.ObjectId,
            ref: 'ChessPlayer',
            required: true
        },
        round: {
            type: Number,
            required: true
        }
    }]
});

const ChessEvent = mongoose.model('ChessEvent', chessEventSchema);

module.exports = ChessEvent;
