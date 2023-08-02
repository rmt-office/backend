import userServices from '../services/User.services'
import { checkEmailInput, checkEmailRegex, checkPasswordInput, checkRequiredInput, checkUsername, checkUsernameForUpdate, validateLogin } from '../utils/checkUserInfo'
import { createError, throwError } from '../utils/throwError'
import { RouteProps } from '../utils/types'
import { hashPassword, validatePassword } from '../utils/passwordHandlers'
import { createToken } from '../utils/tokenHandler'
import { sendMail } from '../utils/nodemailer'
import { NewUser } from '../models/User.model'

type InputType = {
	email: string, password: string, confirmPassword: string, username: string
}
class UserController {
	async signup(req: RouteProps['req'], res: RouteProps['res'], next: RouteProps['next']) {
		const { email, password, confirmPassword }: InputType = req.body
		let { username }: InputType = req.body
		try {
			checkRequiredInput(email, password, confirmPassword)
			username = checkUsername(username, email)
			// TODO: Check the user for unique username?
			const userFromDB = await userServices.getOneUser({ $or: [{ email }, { username }] })
			if (userFromDB) {
				const error = createError('User already exists', 400)
				throwError(error)
			}

			const passwordHash = await hashPassword(password)

			const createdUser = await userServices.createUser({ username, email, password: passwordHash })
			const newUser: NewUser = createdUser.toObject()

			delete newUser.password

			await sendMail(email, newUser)

			res.status(201).json(newUser)
		} catch (error: any) {
			error.place = 'Sign up'
			next(error)
		}
	}

	async login(req: RouteProps['req'], res: RouteProps['res'], next: RouteProps['next']) {
		const { email, password } = req.body

		try {
			const userFromDB = await userServices.getOneUser({ email })
			await validateLogin(userFromDB, password)

			const userObject: NewUser = userFromDB!.toObject()
			if (userObject) {
				delete userObject.password

				const token = createToken(userObject)

				res.status(200).json(token)
			}
		} catch (error: any) {
			error.place = 'Login'
			next(error)
		}
	}

	async verify(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		try {
			const decodedToken = req.payload

			res.status(200).json(decodedToken)
		} catch (error: any) {
			error.place = 'Verify'
			next(error)
		}
	}

	async emailVerification(req: RouteProps['req'], res: RouteProps['res'], next: RouteProps['next']) {
		const { id } = req.params
		try {
			const updateVerify = {
				filter: {
					// TODO: Change to random number
					_id: id,
				},
				infoUpdate: {
					isVerified: true
				},
				options: {
					new: true
				}
			}
			await userServices.findOneAndUpdate(updateVerify)
			// TODO: change to an HTML response with a successfull response
			res.status(200).json({ message: 'Your email was successfully verified' })
		} catch (error: any) {
			error.place = 'Email verification'
			next(error)
		}
	}

	async update(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const { username, email, password, confirmPassword, currentPassword } = req.body
		try {
			const user = await userServices.getOneUser({ email: req.payload!.email })
			let updatedUser

			if (user) {
				if (password) {
					const validChanges = await validatePassword(currentPassword, user.password)

					if (!validChanges) {
						const error = createError('Invalid credentials', 400)
						throwError(error)
					}

					checkPasswordInput(password, confirmPassword)

					const newPassword = await hashPassword(password)
					updatedUser = await userServices.findOneAndUpdate({
						filter: { _id: req.payload!._id },
						infoUpdate: { password: newPassword },
						options: { new: true, runValidators: true }
					})
				}

				if (email) {
					const validChanges = await validatePassword(currentPassword, user.password)

					if (!validChanges) {
						const error = createError('Invalid credentials', 400)
						throwError(error)
					}

					checkEmailInput(email)
					const newInfo = { username, email }

					let newUpdatableDate = checkUsernameForUpdate(user, username)

					updatedUser = await userServices.findOneAndUpdate({
						filter: { _id: req.payload!._id },
						infoUpdate: { ...newInfo, canUpdateOn: newUpdatableDate },
						options: { new: true, runValidators: true }
					})
				}

				const withoutPassword: NewUser = updatedUser!.toObject()
				delete withoutPassword.password

				const token = createToken(withoutPassword)

				res.status(200).json(token)
			}
		} catch (error: any) {
			error.place = 'Update user'
			next(error)
		}

	}

	async updatePhoto(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const { _id } = req.payload!
		const { profilePicture } = req.body

		try {
			if (!profilePicture) {
				const error = createError('You must send a picture url', 400)
				throwError(error)
			}
			
			const updatedUser = await userServices.findOneAndUpdate({
				filter: { _id: _id }, 
				infoUpdate: { profilePicture }, 
				options: { new: true, fields: '-password' }
			})

			res.status(200).json(updatedUser)
		} catch (error: any) {
			error.place = 'Profile photo update'
			next(error)
		}
	}

	async updateFavorites(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		// TODO: Implement update favorites after places are created
	}

	async delete(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		try {
			const user = await userServices.deleteOne({ _id: req.payload!._id })
			if (user === null) {
				const error = createError('User already deleted', 400)
				throwError(error)
			}
			res.status(204).json()
		} catch (error: any) {
			error.place = 'Delete user'
			next(error)
		}
	}
}

export default new UserController()
