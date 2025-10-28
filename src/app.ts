import cors from 'cors'
import express, { Request, Response } from 'express'
import morgan from 'morgan'

import unknownEndpoint from './middlewares/unknown-endpoint'

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(unknownEndpoint)

export default app
