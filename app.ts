import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res, next) => {
  res.send('OK')
})

export default app
