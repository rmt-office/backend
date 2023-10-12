import mongoose from 'mongoose'
import z from 'zod'

export const createReviewSchema = z.object({
	body: z.object({
		score: z.number().min(1).max(5),
		comment: z.string().optional(),
		tags: z.array(z.enum([
			'quiet place',
			'good internet connection',
			'good location',
			'easy to find a place',
			'many plugs',
		])).optional(),
        price: z.number().min(1).max(5).optional(),
        wifi: z.enum(['Fast', 'Medium', 'Slow']).optional(),
	}),
})

export const updateReviewSchema = createReviewSchema.deepPartial()

export type ReviewSchema = z.TypeOf<typeof createReviewSchema>

export const testIdReviewSchema = (path: string) => {
	return z.object({
		params: z.object({
			id: z.string().refine(data => mongoose.isValidObjectId(data), {
				message: 'Invalid Id',
				path: [path],
			}),
		}),
	})
}
