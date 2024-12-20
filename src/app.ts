import cors from 'cors'
import express, { Application, Request, Response } from 'express'

import apiInfoLogger from './app/middlewares/apiInfoLogger'
import errorHandler from './app/middlewares/errorHandler'
import notFound from './app/middlewares/notFound'

// ** express app **
const app: Application = express()

// ** parse request body **
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ** cors **
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:4173',
      'http://localhost:4174'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  })
)

// ** API Info Logger **
app.use(apiInfoLogger)

// ** Default Routes **
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Blog Management System!')
})
app.get('/api', (req: Request, res: Response) => {
  res.send('This is the root API route!')
})

// ** API Endpoint Not Found **
app.use('*', notFound)

// ** Error Handler **
app.use(errorHandler)

export default app
