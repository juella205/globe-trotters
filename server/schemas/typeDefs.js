const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    cities: [City]!
  }

  type City {
    _id: ID
    cityName: String
    username: String
    activities: [Activity]!
  }

  type Activity {
    _id: ID
    activityText: String
    activityCity: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
  }

  type Mutation {

  }
`;


module.exports = typeDefs;
