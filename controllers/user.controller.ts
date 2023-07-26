import userServices, { NewUser } from '../services/User.services'
import { throwError } from '../utils/throwError'
import { RouteProps } from '../utils/types'

class UserController {
	async signup(req: RouteProps['req'], res: RouteProps['res'], next: RouteProps['next']) {
		const { username, password, email } = req.body
		try {
			if (!email) {
				const error = {
					message: 'Email is required',
					status: 400,
				}
				throwError(error)
			}

			const createdUser = await userServices.createUser({ username, email, password })
			const newUser: NewUser = createdUser.toObject()

			delete newUser.password

			res.status(201).json(newUser)
		} catch (error: any) {
			error.place = 'Sign up'
			next(error)
		}
	}
}

export default new UserController()
