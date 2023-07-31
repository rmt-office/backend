import { User } from "../models/User.model"
import { validatePassword } from "./passwordHandlers"
import { throwError } from "./throwError"

export const checkRequiredInput = (email: string, password: string, confirmPassword: string, oldPassword?: string) => {
  if (oldPassword !== undefined) {
    if (oldPassword === password) {
      throw new Error('same pass')
    }
    if (oldPassword === '')
    throw new Error('old pass')
  }
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

  if (email) {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    const isValid = email.match(emailRegex)
    if (!isValid) {
      const error = {
        message: 'Please fill in a valid email',
        status: 400,
      }
      throwError(error)
    }
  }

  if (password) {
    if (password !== confirmPassword) {
      const error = {
        message: `The passwords don't match`,
        status: 400,
      }
      throwError(error)
    }

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    const isValid = password.match(passwordRegex)
    if (!isValid) {
      const error = {
        message: 'Please use a password with at least eight characters, one upper case, lower case, one number and one special character',
        status: 400,
      }
      throwError(error)
    }
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
    if (!user.isVerified) {
      const error = {
        message: 'Not verified',
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
