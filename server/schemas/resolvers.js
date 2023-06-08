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
            return City.findOne({ _id: cityId });
        },
        // Adding resolver for retrieving activities and user activities by ID and throwing error if user is not found
        // activities: async (_, { username , city }) => {
        //     const params = {username : { username }, city : { city }  };
        //     return Activity.find(params).sort({ createdAt: -1 });

        // },

        activities: async (_, { username, city }) => {
            const user = await User.findOne({ username }).populate({
              path: 'cities',
              match: { name: city } // Should filter cities based on the provided
            }).populate('cities.activities');
           
            if (!user) {
              throw new AuthenticationError('User not found');
            }

            const activities = user.cities.reduce((acc, cityObj) => {
                return acc.concat(cityObj.activities);
              }, []);
          
              return activities;
            },
          },
      
    //         return user.cities[0].activities;
    //       },
    // },

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
        // createActivity: async (_, { title, description, city, username  }) => {
        //     const activity = await Activity.create({ title, description, city, username });
            
        //     await City.findOneAndUpdate(
        //         { cityName: city  },
        //         {  username: username },
        //         { $addToSet: { activities: activity._id } }
        //     );  
            
        //     return activity;
        // },

        // Based on the username the cities field populates
        createActivity: async (_, { title, description, city, username }) => {
            const user = await User.findOne({ username }).populate('cities');
          //authentications
            if (!user) {
              throw new AuthenticationError('User not found');
            }
          // searching for the city object in the users cities array matching the city name with the city 
            const cityObj = user.cities.find((cityObj) => cityObj.cityName === city);
            if (!cityObj) {
              throw new AuthenticationError('City not found');
            }
          //creating a new activity using the city ID and user ID
            const activity = await Activity.create({
              title,
              description,
              city: cityObj._id,
              username: user._id
            });
          // adding the ID of the new activity to the array of the associated city
            cityObj.activities.push(activity._id);
            await cityObj.save();
          // New activity ID is added in the array of the
            user.activities.push(activity._id);
            await user.save();
          
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

        createUser: async (parent, args) => {
            // Create user
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user };
          },
          // Other mutation resolvers here 
          login: async (parent, args) => {
            const user = await User.findOne({email: args.email});
      
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
