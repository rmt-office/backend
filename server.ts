import app from './app'

const server = app.listen(process.env.PORT, () => console.log(`Running on http://localhost:${process.env.PORT}`))