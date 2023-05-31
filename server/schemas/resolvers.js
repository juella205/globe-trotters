const resolvers = {
    Query: {
      // Your existing query resolvers
    },
    Mutation: {
      createUser: async (parent, { input }, context) => {
        // Perform validation, password hashing, and database insertion
        const { name, email, password } = input;
        
        
  