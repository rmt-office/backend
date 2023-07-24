import { NextFunction, Request, Response } from 'express'
import userServices, { NewUser } from '../services/User.services'

class UserController {
	async signup(req: Request, res: Response, next: NextFunction) {
		const { username, password, email } = req.body
		try {
			const createdUser = await userServices.createUser({ username, email, password })
			const newUser: NewUser  = createdUser.toObject()

			delete newUser.password

			res.status(201).json(newUser)
		} catch (error) {
			next(error)
		}

	}
}

export default new UserController()
