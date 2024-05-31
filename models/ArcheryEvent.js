// ArcheryEvent.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const archeryEventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const ArcheryEvent = mongoose.model('ArcheryEvent', archeryEventSchema);

module.exports = ArcheryEvent;
