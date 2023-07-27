import userServices, { NewUser } from '../services/User.services'
import { checkRequiredInput, checkUsername, validateLogin } from '../utils/checkUserInfo'
import { throwError } from '../utils/throwError'
import { RouteProps } from '../utils/types'
import { hashPassword, validatePassword } from '../utils/passwordHandlers'
import UserServices from '../services/User.services'

class UserController {
	async signup(req: RouteProps['req'], res: RouteProps['res'], next: RouteProps['next']) {
		const { password, email } = req.body
		let { username } = req.body
		try {
			checkRequiredInput(email, password)
			username = checkUsername(username, email)

			const userFromDB = await UserServices.getOneUser({ username })
			if (userFromDB) {
				const error = {
					message: 'User already exists',
					status: 400
				}
				throwError(error)
			}

			const passwordHash = await hashPassword(password)

			const createdUser = await userServices.createUser({ username, email, password: passwordHash })
			const newUser: NewUser = createdUser.toObject()

			delete newUser.password

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

			res.status(200).json(userFromDB)
		} catch (error: any) {
			error.place = 'Login'
			next(error)
		}
	}
}

export default new UserController()
