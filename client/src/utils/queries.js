import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query GetUser($username: String!)
{
    user(username: $username) {
        _id
        username
        email
        cities {
          _id
          cityName
          activities {
            _id
            title
            description
            city
          }
        }
      }
    }
}`

export const QUERY_CITIES = gql`
  query GetCities($username: String)
{
    cities(username: $username) {
        _id
        activities {
          _id
          title
          description
          city
        }
        cityName
      }
    }
}`

export const QUERY_CITY = gql`
  query GetCity($cityId: ID!)
{
    city(cityId: $cityId) {
        _id
        cityName
        activities {
          _id
          description
          title
        }
        username
      }
}`

export const QUERY_ACTIVITIES = gql`
  query GetActivities($username: String!, $city: String!)
{
    activities(username: $username, city: $city) {
        _id
        description
        title
      }
}`