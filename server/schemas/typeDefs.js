const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    cities: [City]!
    activities: [Activity]!
  }

  type City {
    _id: ID
    cityName: String
    username: String
    activities: [Activity]!
  }

  type Activity {
    _id: ID
    title: String
    description: String
    city: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    cities(username: String): [City]
    city(cityId: ID!): City
    userActivities(userId: ID!, city: String!): [Activity]
  }

  type Mutation {
    addCity(cityName: String!, username: String!): City
    removeCity(cityId: ID!): City
    createActivity(title: String, description: String): Activity
    updateActivity(id: ID!, title: String, description: String): Activity
    deleteActivity(id: ID!): Activity
  }
`;


module.exports = typeDefs;
// Added Activities field to User type to represent the users activities
// Added userActivities to query type which accepts userId and city as args and returns an array of activities
// Added create, update, and delete activity mutations to handle each respectively
// Changed Activity type fields to match the activity model