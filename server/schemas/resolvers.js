const resolvers = {
    Query: {
      // Your existing query resolvers
    },
    Mutation: {
      createUser: async (parent, { input }, context) => {
        // Perform validation, password hashing, and database insertion
        const { name, email, password } = input;
        const user = await User.create({
            name,
            email,
            password, // Remember to hash the password before storing it in the database
          });
    
          return user;
        },
        // Add other mutation resolvers here if needed
      },
    };
    
    module.exports = resolvers;
        
  