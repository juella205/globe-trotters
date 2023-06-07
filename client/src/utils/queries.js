import { gql } from '@apollo/client';

export const QUERY_USER = gql`
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
{
    activities(username: $username, city: $city) {
        _id
        description
        title
      }
}`