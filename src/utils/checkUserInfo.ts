import dayjs from 'dayjs'
import { User } from '../models/User.model'
import { validatePassword } from './passwordHandlers'
import { createError, throwError } from './throwError'

export const checkEmailRegex = (email: string) => {
	const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
	return email.match(emailRegex)
}
const checkPasswordRegex = (password: string) => {
	const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
	return password.match(passwordRegex)
}

type UserInput = (email: string, password: string, confirmPassword: string) => void

export const validateLogin = async (user: User | null, passwordCandidate: string) => {
	if (user) {
		const isValid = await validatePassword(passwordCandidate, user.password)
		if (!isValid) {
			const error = createError('Invalid credentials', 400)
			throwError(error)
		}
		// TODO: Uncomment for deployed version
		// if (!user.isVerified) {
		//   const error =  createError(`User isn't verified yet`, 400)
		//   throwError(error)
		// }
	} else {
		const error = createError('Invalid credentials', 400)
		throwError(error)
	}
}

export const checkPasswordInput = (password: string, confirmPassword: string) => {
	if (password) {
		if (password !== confirmPassword) {
			const error = createError(`The passwords don't match`, 400)
			throwError(error)
		}
		const isValid = checkPasswordRegex(password)
		if (!isValid) {
			const error = createError(
				'Please use a password with at least eight characters, one upper case, lower case, one number and one special character',
				400
			)
			throwError(error)
		}
	}
}

export const checkEmailInput = (email: string) => {
	const validEmail = checkEmailRegex(email)
	if (!validEmail) {
		const error = createError('Please fill in a valid email', 400)
		throwError(error)
	}
}

export const checkUsernameForUpdate = (user: User, username: string) => {
	//TODO: Set the first updatable to the created date
	if (user.username !== username) {
		const canUpdate = user.canUpdateOn
		if (canUpdate !== 'first') {
			const isUpdatable = dayjs().isBefore(dayjs(canUpdate))
			if (isUpdatable) {
				//TODO: send the next updatable date?
				const error = createError(`You can't change your username right now`, 400)
				throwError(error)
			}
			return dayjs().add(3, 'month').format('YYYY-MM-DD')
		}
		return dayjs().add(3, 'month').format('YYYY-MM-DD')
	}
}
