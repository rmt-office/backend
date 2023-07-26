import { RouteProps } from '../utils/types'

export const errorHandling = (
	error: RouteProps['error'],
	req: RouteProps['req'],
	res: RouteProps['res']
) => {
	console.log(`ERROR: `)
	console.table(error)
	res.status(error.status || 500).json({ message: error.message, place: error.place })
}
