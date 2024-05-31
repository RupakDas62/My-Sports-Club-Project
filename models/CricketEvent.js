// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
});

const CricketEvent = mongoose.model('CricketEvent', eventSchema);
module.exports = CricketEvent;