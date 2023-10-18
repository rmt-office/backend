import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import cors from 'cors'

import { connectDB } from './src/database/databaseConnection'
import routes from './src/routes'

const ORIGIN = process.env.ORIGIN

const app = express()

connectDB()

app.use(express.json())
app.use(morgan('dev'))
app.use(
	cors({
		origin: ORIGIN,
	})
)
app.use('/', routes)

export default app
