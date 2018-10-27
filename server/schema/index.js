import {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList} from 'graphql'
import _ from 'lodash' 


const trips = [
  {name: 'Comodo', id: '1', country: 'Australia', ownerId: '1'},
  {name: 'Bratan', id: '2', country: 'Australia', ownerId: '1'},
  {name: 'Melbourne', id: '3', country: 'Australia', ownerId: '2'},
]
const owners = [
  {name: 'Eric', id: '1'},
  {name: 'Pavel', id: '2'}
]
const OwnerType = new GraphQLObjectType({
  name: 'Owner',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    trips: {
      type: new GraphQLList(TripType),
      resolve(parent, args){
        console.log('parent Owner', parent, 'args', args)
        return _.filter(trips, {ownerId: parent.id})
      }
    }
  })
})
const TripType = new GraphQLObjectType({
  name: 'Trip',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    },
    owner: {
      type: OwnerType,
      resolve(parent){
        console.log('parent Trip', parent)
        return _.find(owners, {id: parent.ownerId} )
      }
    }

  })
})
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    owner: {
      type: OwnerType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(owners, {id: args.id})
      }
    },
    trip: {
      type: TripType,
      args: {id: {type: GraphQLID} },
      resolve(parent, args) {
        return _.find(trips, {id: args.id})
        //code to get data from the DB or other sources
      }
    },
    trips: {
      type: new GraphQLList(TripType),
      resolve() {
        return trips
      }
    },
    owners: {
      type: new GraphQLList(OwnerType),
      resolve() {
        return owners
      }
    }

  })
}) 
const schema =  new GraphQLSchema({
  query: RootQuery
})
export {schema}