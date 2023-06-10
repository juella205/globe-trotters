import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      email
      username
    }
  }
`;
// final version at the end of tutoring session 
// export const LOGIN_USER = gql`
//   mutation Login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         _id
//         username
//       }
//     }
//   }
// `;
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      cities {
        _id
        activities {
          _id
          description
          title
        }
        cityName
      }
      _id
      username
    }
  }
`;

export const ADD_CITY = gql`
  mutation AddCity($cityName: String!, $username: String!) {
    addCity(cityName: $cityName, username: $username) {
      _id
      cityName
    }
  }
`;

export const REMOVE_CITY = gql`
  mutation RemoveCity($cityId: ID!) {
    removeCity(cityId: $cityId) {
      _id
      activities {
        _id
        description
        title
      }
      cityName
    }
  }
`;

export const CREATE_ACTIVITY = gql`
  mutation CreateActivity($title: String!, $description: String!, $city: ID!, $username: String!) {
    createActivity(title: $title, description: $description, city: $city, username: $username) {
      _id
      title
      description
      city {
        _id
        cityName
      }
    }
  }
`;

export const UPDATE_ACTIVITY = gql`
  mutation UpdateActivity(
    $updateActivityId: ID!
    $title: String
    $description: String
  ) {
    updateActivity(
      id: $updateActivityId
      title: $title
      description: $description
    ) {
      city
      description
      title
      _id
    }
  }
`;

export const DELETE_ACTIVITY = gql`
  mutation DeleteActivity($deleteActivityId: ID!) {
    deleteActivity(id: $deleteActivityId) {
      _id
      city
      description
      title
    }
  }
`;
