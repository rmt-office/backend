import { connect, disconnect } from 'mongoose'

const MONGODB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/remote-office'

export const connectDB =  async () => {
  const { connection: { name } } = await connect(MONGODB)
  console.log(`Connect to database ${name}`)
}



