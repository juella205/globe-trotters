const jwt = require('jsonwebtoken');
const { User, City, Activity } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('thoughts');
          },
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
        createUser: async (parent, { username, email, password }) => {
            // Create user
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return {token, user };
          },
          // Other mutation resolvers here 
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            // If there is no user with the email address, return an Authentication error stating sp
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
            
            // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
            const correctPW = await user.isCorrectPassword(password);
      
          // If the password is incorrect, return an Authentication error stating so
            if (!correctPW) {
              throw new AuthenticationError('Incorrect password');
            }
      
           // If email and password are correct, sign user into the application with a JWT
              const token = signToken(user);
      
            
          // Return an `Auth` object that consists of the signed token and user's information
            return {token, user};
          },
        },
    };


module.exports = resolvers;
