const mongoose = require('mongoose');

const archeryPlayerSchema = new mongoose.Schema({
    basicDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    totalArrowsShot: {
        type: Number
    },
    bullsEyes: {
        type: Number
    },
    accuracy: {
        type: Number
    }
});

module.exports = mongoose.model('ArcheryPlayer', archeryPlayerSchema);
