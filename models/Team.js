const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: String,
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CricketPlayer' }]
});

module.exports = mongoose.model('Team', teamSchema);