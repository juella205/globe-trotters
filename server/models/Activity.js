const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

// Using Mongoose to define a schema for the activity model which maps to a collection in mongoDB. The schema specifies the structure of an activity