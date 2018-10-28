import mongoose, {Schema} from 'mongoose'
const tripSchema = new Schema({
  name: String,
  country: String,
  ownerId: String
})
const TripModel = mongoose.model('Trip', tripSchema)
export {TripModel}