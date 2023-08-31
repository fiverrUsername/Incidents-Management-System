import dotenv from 'dotenv'

dotenv.config()

// CREATE CONFIG OBJECT
const config = {
  mongo: {
    url: process.env.MONGO_URL_LOCAL
  },
  server: {
    port: process.env.SERVER_PORT
  }
}

// Write the updated swagger.json back to the file

// CHECK FOR ENVIRONMENT

// EXPORT
export default config
