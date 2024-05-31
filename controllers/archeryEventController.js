const ArcheryEvent = require('../models/ArcheryEvent');

exports.renderCreateArcheryEventPage = (req, res) => {
    res.render('createArcheryEvent');
};

exports.createArcheryEvent = async (req, res) => {
    try {
        const { name, date } = req.body;

        // Create a new archery event
        const newArcheryEvent = new ArcheryEvent({
            name,
            date
        });

        // Save the new archery event to the database
        await newArcheryEvent.save();

        // Respond with a success message
        res.send(`Archery event "${name}" created successfully for ${new Date(date).toLocaleString()}.`);
    } catch (error) {
        console.error('Error creating archery event:', error);
        res.status(500).send('Internal Server Error');
    }
};
