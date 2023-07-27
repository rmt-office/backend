import userServices, { NewUser } from '../services/User.services'
import { checkRequiredInput, checkUsername, validateLogin } from '../utils/checkUserInfo'
import { throwError } from '../utils/throwError'
import { PayloadRequest, RouteProps } from '../utils/types'
import { hashPassword } from '../utils/passwordHandlers'
import { createToken } from '../utils/tokenHandler'
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
	
			const userObject: NewUser | undefined = userFromDB?.toObject()
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
	
	async verify(req: PayloadRequest, res: RouteProps['res'], next: RouteProps['next']) {
		try {
			const decodedToken = req.payload
			
			res.status(200).json(decodedToken)
		} catch (error: any) {
			error.place = 'Verify'
			next(error)
		}
	}
}

export default new UserController()
