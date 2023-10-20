import mongoose from 'mongoose'
import { z } from 'zod'

export const testIdSchema = (test: string) => {
	return z.object({
		params: z.record(z.string()).refine(
			(data) => {
				const keys = Object.keys(data)
				return mongoose.isValidObjectId(data[keys[0]])
			},
			{
				message: 'Invalid Id',
				path: [test],
			}
		),
	})
}
