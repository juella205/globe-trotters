const jwt = require('jsonwebtoken');
cconst resolvers = {
    Query: {
      users: async () => {
        return User.find().populate('thoughts');
      },
    Mutation: {
      createUser: async (parent, { input }, context) => {
        // Create user
     const { name, email, password } = input;
    const user = await User.create({ name,email,password,});
     const token = signToken(user);
          return user;
        },
        // Add other mutation resolvers here if needed
        login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
      },
    }; 
    
    module.exports = resolvers;
    };
};

  