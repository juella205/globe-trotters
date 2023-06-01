const { Schema, model } = require('mongoose');

const citySchema = new Schema({
    cityName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    activities: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Activity',
        },
    ],
});

const City = model('City', citySchema);

module.exports = City;