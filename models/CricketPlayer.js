const mongoose = require('mongoose');

const cricketPlayerSchema = new mongoose.Schema({
    basicDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    runs: {
        type: Number
    },
    wickets: {
        type: Number
    },
    strikeRate: {
        type: Number
    }
});

module.exports = mongoose.model('CricketPlayer', cricketPlayerSchema);
