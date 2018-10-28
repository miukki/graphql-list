import {gql} from 'apollo-boost'
const getOwnersQuery =  gql`
{
  owners {
    id
    name
  }
}
`
const getTripsQuery =  gql`
{
  trips {
    id
    name
  }
}
`

const getTripQuery =  gql`
  query($id: ID){
    trip (id: $id) {
      id
      name
      country
      owner {
        id
        name
        trips {
          id
          name
        }
      }
    }
  }
`

const addTripMutation = gql`
  mutation ($name: String!, $country: String!, $ownerId: ID!){
    addTrip(name: $name, country: $country, ownerId: $ownerId) {
      id
    }
  }
`



export {getOwnersQuery, getTripsQuery, addTripMutation, getTripQuery}