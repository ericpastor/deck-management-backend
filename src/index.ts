import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import allTypeDefs from './schemas/index'
import allResolvers from './resolvers/index'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

console.log('connecting to', MONGO_URI)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs: allTypeDefs,
  resolvers: allResolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})
console.log(`Server ready at ${url}`)
