import mongoose from 'mongoose'
import z from 'zod'

export const createReviewSchema = z.object({
	body: z.object({
		score: z.number(),
		comment: z.string(),
		tags: z.string(),
		zipCode: z.string(),
        price: z.number(),
        wifi: z.string(),
        // like: z.Schema.Types.ObjectId,
        // dislike: z.Schema.Types.ObjectId,
        // https://github.com/colinhacks/zod/issues/318
        reply: z.string(),
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
