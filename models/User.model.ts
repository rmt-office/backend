import { createModel } from '../mongoose/mongooseModelCreation'

interface User {
  email: {
    type: typeof String,
    required: boolean
  },
  password: {
    type: typeof String,
    required: boolean
  },
  username: {
    type: typeof String,
  },
  createdAt?: string,
  updatedAt?: string
}

const userSchema: User = {
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
  }
}

export default createModel(userSchema, 'User')
