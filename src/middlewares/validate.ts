import { AnyZodObject } from 'zod'
import { RouteProps } from '../utils/types'

export const validate =
	(schema: AnyZodObject) =>
	(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) => {
		try {
			schema.parse({
				body: req.body,
				params: req.params,
				query: req.query,
			})
			next()
		} catch (error: any) {
			error.status = 400
			error.place = 'Validate Middleware'
			next(error)
		}
	}
