import { User } from "../models/User.model"
import { validatePassword } from "./passwordHandlers"
import { throwError } from "./throwError"

export const checkRequiredInput = (email: string, password: string) => {
  if (!email && !password) {
    const error = {
      message: 'Email and Password are required',
      status: 400,
    }
    throwError(error)
  } else if (!password) {
    const error = {
      message: 'Password is required',
      status: 400,
    }
    throwError(error)
  } else if (!email) {
    const error = {
      message: 'Email is required',
      status: 400,
    }
    throwError(error)
  }
}

export const checkUsername = (username: string, email: string) => {
  if (!username) {
    username = email.split('@')[0]
  }

  return username
}

export const validateLogin = async (user: User | null, passwordCandidate: string) => { 
  if (user) {
    const isValid = await validatePassword(passwordCandidate, user.password)
    if (!isValid) {
      const error = {
        message: 'Email and/or password is incorrect',
        status: 400
      }
      throwError(error)
    }
  } else {
    const error = {
      message: 'Email and/or password is incorrect',
      status: 400
    }
    throwError(error)
  }
}
