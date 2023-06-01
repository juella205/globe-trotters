
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
        // Adding resolver for retrieving activities and user activities by ID and throwing error if user is not found
        activities: () => Activity.find(),
        userActivities: async (_, { userId, city }) => {
            const user = await User.findById(userId).populate({
                path: 'activities',
                match: { city },
            });

            if (!user) {
                throw new Error('User not found');
            }

            return user.activities;
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
        // The resolver for creating a new activity
        createActivity: async (_, { title, description }) => {
            const activity = new Activity({ title, description });
            await activity.save();
            return activity;
        },
        // The resolver for updating a existing activity, finds by ID and updates its title and description
        updateActivity: async (_, { id, title, description }) => {
            const activity = await Activity.findByIdAndUpdate(id, { title, description }, { new: true });
            return activity;
        },
        // The resolver for deleting an activity, finds and removes by ID
        deleteActivity: async (_, { id }) => {
            const activity = await Activity.findByIdAndDelete(id);
            return activity;
        },
    }
};

module.exports = resolvers;