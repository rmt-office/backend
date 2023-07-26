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
