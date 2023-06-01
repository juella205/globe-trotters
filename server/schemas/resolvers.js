
const { User, City, Activity } = require('../models');

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('cities');
        },
        cities: async (parent, { username }) => {
            const params = username ? { username } : {};
            return City.find(params).sort({ createdAt: -1 });
        },
        city: async (parent, { cityId }) => {
            return City.findOne({ _id: cityId });
        },
    },

    Mutation: {
        addCity: async (parent, { cityName, username }) => {
            const city = await City.create({ cityName, username });

            await User.findOneAndUpdate(
                { username: username },
                { $addToSet: { cities: city._id } }
            );

            return city;
        },
        removeCity: async (parent, { cityId }) => {
            return City.findOneAndDelete({ _id: cityId });
        },
    }
};

module.exports = resolvers;