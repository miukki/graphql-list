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
export {getOwnersQuery, getTripsQuery}