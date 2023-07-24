import { NextFunction, Request, Response } from 'express'
import userServices from '../services/User.services'

class UserController {
	async signup(req: Request, res: Response, next: NextFunction) {
		const { username, password, email } = req.body
		const newUser = await userServices.createUser({ username, email, password })

		console.log(newUser)
	}
}

export default new UserController()
