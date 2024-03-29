//TODO: Review functionality of this middleware

import UserService from '../services/User.service'
import { createError, throwError } from '../utils/throwError'
import { RouteProps } from '../utils/types'

export const isAdmin = async (
	req: RouteProps['payload'],
	res: RouteProps['res'],
	next: RouteProps['next']
) => {
	const { _id } = req.payload!

	try {
		const user = await UserService.getOneUser({ _id })

		if (!user) {
			const error = createError(`Check the credentials, it seems that this user doesn't exist`, 401)
			return throwError(error)
		}

		req.isAdmin = user.isAdmin

		next()
	} catch (error: any) {
		error.place = 'Admin middleware'
		next(error)
	}
}
