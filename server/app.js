import express from 'express'
import graphqlHTTP from 'express-graphql'
import {schema} from './schema'
import mongoose from 'mongoose'

mongoose.connect('mongodb://miukki:test123@ds219641.mlab.com:19641/trips')
mongoose.connection.once('open', () => {
  console.log('connect db')
})
const app = express()
app.use('/graphql', graphqlHTTP({
  schema, 
  graphiql: true
}))
app.listen(4000, ()=> {console.log('requests', schema)})


