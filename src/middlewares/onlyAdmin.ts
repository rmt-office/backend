//TODO: Review functionality of this middleware

import UserService from '../services/User.service'
import { createError, throwError } from '../utils/throwError'
import { RouteProps } from '../utils/types'

export const onlyAdmin = async (
	req: RouteProps['payload'],
	res: RouteProps['res'],
	next: RouteProps['next']
) => {
	const { _id } = req.payload!

	try {
		const user = await UserService.getOneUser({ _id })
		if (!user!.isAdmin) {
			const error = createError(`You don't have the rights to do that`, 403)
			throwError(error)
		}
		next()
	} catch (error: any) {
		error.place = 'Admin middleware'
		next(error)
	}
}
