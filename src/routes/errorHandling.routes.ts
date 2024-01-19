import { RouteProps } from '../utils/types'

export const errorHandling = (error: RouteProps['error'], res: RouteProps['res']) => {
	console.log(`ERROR: `)
	if (error.issues) {
		console.log(error.issues)
		const errors = error.issues.map(error => ({
			message: error.message,
			expected: error.expected,
			received: error.received,
			path: error.path,
		}))
		return res.status(error.status || 500).json({ errors, place: error.place })
	}
	console.table(error)
	return res.status(error.status || 500).json({ message: error.message, place: error.place, details: error.details })
}
