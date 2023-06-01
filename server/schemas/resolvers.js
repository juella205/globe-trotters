const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      // Create user
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return {token, user };
    },
    // Add other mutation resolvers here if needed
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      // If there is no user with the email address, return an Authentication error stating sp
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      




    },
  },
};

module.exports = resolvers;

    


  