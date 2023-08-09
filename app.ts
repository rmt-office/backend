import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'

import { connectDB } from './src/database/databaseConnection'

import routes from './src/routes'

const app = express()

connectDB()
app.use(express.json())
app.use(morgan('dev'))

app.use('/', routes)

export default app
