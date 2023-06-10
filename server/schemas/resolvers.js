const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const { User, City, Activity } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('cities');
          },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('cities');
        },
        cities: async (parent, { username }) => {
            const params = username ? { username } : {};
            return City.find(params).sort({ createdAt: -1 });
        },
        city: async (parent, { cityId }) => {
            return City.findOne({ _id: cityId }).populate('activities');
        },

        activities: async (parent, { username, city }) => {
          const activities = await Activity.find({ username, city }).sort({createdAt: -1 });
          return activities;
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
        // Based on the username the cities field populates
        createActivity: async (_, {activities}) => {
          console.log(activities)
            const user = await User.findOne({ username:activities[0].username }).populate('cities');
          //authentications
            if (!user) {
              throw new AuthenticationError('User not found');
            }
          // searching for the city object in the users cities array matching the city name with the city 
            const cityObj = user.cities.find((cityObj) => cityObj.cityName === activities[0].city);
            if (!cityObj) {
              const newCity = await City.create({ cityName:activities[0].city, username:activities[0].username });

            await User.findOneAndUpdate(
                { username:activities[0].username },
                { $addToSet: { cities: newCity._id } }
            );
            };
            
              const createdActivities = await Activity.insertMany(activities);
              await City.findOneAndUpdate(
                { cityName: activities[0].city, username:activities[0].username },
                { $push: { activities: { $each: createdActivities.map(activity => activity._id) } } }
              );
              return createdActivities;
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

        createUser: async (parent, args) => {
            // Create user
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user };
          },
          // Other mutation resolvers here 
          login: async (parent, args) => {
            console.log("inside login resolver")
            const user = await User.findOne({email: args.email});
            // .select("-__v")
            console.log(user)
            // If there is no user with the email address, return an Authentication error stating sp
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
            
            // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
            const correctPW = await user.isCorrectPassword(args.password);
      
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
