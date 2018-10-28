import mongoose, {Schema} from 'mongoose'
const ownerSchema = new Schema({
  name: String,
})
const OwnerModel = mongoose.model('Owner', ownerSchema)
export {OwnerModel}