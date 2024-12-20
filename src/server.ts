import { Server } from 'http'

import mongoose from 'mongoose'

import app from './app'
import { configuration } from './app/config/configuration'

const port: number = configuration.port as number
const DATABASE_URL: string = configuration.mongo.url as string

let server: Server

async function start() {
  // ** Connect to MongoDB **
  await mongoose.connect(DATABASE_URL).then(() => {
    console.info('DB connected!')
  })

  // ** Start Server **
  server = app.listen(port, () => {
    console.info(`Blog Management System API is running on port ${port}!`)
  })
}

// ** Call start function **
start()

process.on('exit', code => {
  console.error(`Process exiting with code: ${code}`)
  if (server) {
    server.close(() => {
      console.error('Server closed on process exit')
    })
  }
})

process.on('uncaughtException', error => {
  console.error('uncaughtException is received. Error details:', error)
  if (server) {
    server.close(() => {
      console.error('Server closed due to uncaughtException')
    })
  }
  process.exit(1)
})

process.on('unhandledRejection', reason => {
  console.error('unhandledRejection is received. Reason:', reason)
  if (server) {
    server.close(() => {
      console.error('Server closed due to unhandledRejection')
    })
  }
  process.exit(1)
})
