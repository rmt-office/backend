import UserService from '../services/User.service'
import { createError, throwError } from '../utils/throwError'
import { RouteProps } from '../utils/types'

export const isAdmin = async (
	req: RouteProps['payload'],
	res: RouteProps['res'],
	next: RouteProps['next']
) => {
	const { _id } = req.payload!
	const { path } = req

	console.log(path)

  try {
    const user = await UserService.getOneUser({ _id })
    if (!user!.isAdmin) {
      const error = createError(`You don't have the rights to delete`, 401)
      throwError(error)
    } 
    next()
  } catch (error: any) {
    error.place = 'Admin middleware'
    next(error)
  }
}
