import userServices from '../services/User.services'
import { checkRequiredInput, checkUsername, validateLogin } from '../utils/checkUserInfo'
import { throwError } from '../utils/throwError'
import { RouteProps } from '../utils/types'
import { hashPassword } from '../utils/passwordHandlers'
import { createToken } from '../utils/tokenHandler'
import UserServices from '../services/User.services'
import { sendMail } from '../utils/nodemailer'
import { NewUser } from '../models/User.model'

class UserController {
	async signup(req: RouteProps['req'], res: RouteProps['res'], next: RouteProps['next']) {
		const { email, password, confirmPassword } = req.body
		let { username } = req.body
		try {
			checkRequiredInput(email, password, confirmPassword)
			username = checkUsername(username, email)

			const userFromDB = await UserServices.getOneUser({ email })
			if (userFromDB) {
				const error = {
					message: 'User already exists',
					status: 400,
				}
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

			const userObject: NewUser  = userFromDB!.toObject()
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
			res.status(200).json({ message: 'Your email was successfully verified'})
		} catch (error: any) {
			error.place = 'Email verification'
			next(error)
		}
	}

	async update(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
	}

	async delete(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		try {
			const user = await userServices.deleteOne({ _id: req.payload!._id! })
			if (user === null) {
				const error = {
					message: 'User already deleted',
					status: 400
				}
				throwError(error)
			}
			res.status(204).json()
		} catch (error: any) {
			error.place = 'Delete an user'
			next(error)
		}
	}
}

export default new UserController()
