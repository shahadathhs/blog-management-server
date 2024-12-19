import express, { Application, Request, Response } from 'express'
import cors from 'cors'

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

// ** Default Routes **
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Blog Management System!')
})
app.get('/api', (req: Request, res: Response) => {
  res.send('This is the root API route!')
})

export default app
