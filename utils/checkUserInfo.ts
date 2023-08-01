import { User } from "../models/User.model"
import { validatePassword } from "./passwordHandlers"
import { createError, throwError } from "./throwError"

export const checkRequiredInput = (email: string, password: string, confirmPassword: string, oldPassword?: string) => {
  if (oldPassword !== undefined) {
    if (oldPassword === password) {
      throw new Error('same pass')
    }
    if (oldPassword === '')
      throw new Error('old pass')
  }
  if (!email && !password) {
    const error = createError('Email and Password are required', 400)
    throwError(error)
  } else if (!password) {
    const error = createError('Password is required', 400)
    throwError(error)
  } else if (!email) {
    const error = createError('Email is required', 400)
    throwError(error)
  }

  if (email) {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    const isValid = email.match(emailRegex)
    if (!isValid) {
      const error = createError('Please fill in a valid email', 400)
      throwError(error)
    }
  }

  if (password) {
    if (password !== confirmPassword) {
      const error = createError(`The passwords don't match`, 400)
      throwError(error)
    }

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    const isValid = password.match(passwordRegex)
    if (!isValid) {
      const error = createError('Please use a password with at least eight characters, one upper case, lower case, one number and one special character', 400)
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
      const error = createError('Email and/or password is incorrect', 400)
      throwError(error)
    }
    // if (!user.isVerified) {
    //   const error =  createError('User isn't verified yet', 400)
    //   throwError(error)
    // }
  } else {
    const error = createError('Email and/or password is incorrect', 400)
    throwError(error)
  }
}
