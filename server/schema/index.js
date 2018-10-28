import {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLID, 
  GraphQLList,
  GraphQLNonNull

} from 'graphql'
// import _ from 'lodash' 
// import {TripModel} from '../models/trip'
import { OwnerModel } from '../models/owner'
import { TripModel } from '../models/trip'
 

// const trips = [
//   {name: 'Comodo', id: '1', country: 'Australia', ownerId: '1'},
//   {name: 'Bratan', id: '2', country: 'Australia', ownerId: '1'},
//   {name: 'Melbourne', id: '3', country: 'Australia', ownerId: '2'},
// ]
// const owners = [
//   {name: 'Eric', id: '1'},
//   {name: 'Pavel', id: '2'}
// ]

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
        return TripModel.find({ownerId: parent.id})
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
        return OwnerModel.findById(parent.ownerId)
      }
    }

  })
})
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addOwner: {
      type: OwnerType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args) {
        let owner = new OwnerModel({
          name: args.name
        })
        return owner.save()

      }
    },
    addTrip: {
      type: TripType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        country: {type: new GraphQLNonNull(GraphQLString)},
        ownerId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        let trip = new TripModel({
          name: args.name,
          country: args.country,
          ownerId: args.ownerId 
        })
        return trip.save()

      }
    }
  }
})
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    owner: {
      type: OwnerType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return OwnerModel.findById(args.id)
      }
    },
    trip: {
      type: TripType,
      args: {id: {type: GraphQLID} },
      resolve(parent, args) {
        return TripModel.findById(args.id)
      }
    },
    trips: {
      type: new GraphQLList(TripType),
      resolve() {
        return TripModel.find({})
      }
    },
    owners: {
      type: new GraphQLList(OwnerType),
      resolve() {
        return OwnerModel.find({})
      }
    }

  })
}) 
const schema =  new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

export {schema}