import mongoose from 'mongoose'
import z from 'zod'

export const createReviewSchema = z.object({
	body: z.object({
		score: z.number().min(1).max(5),
		comment: z.string().optional(),
		tags: z
			.array(
				z.enum([
					'quiet place',
					'good internet connection',
					'good location',
					'easy to find a place',
					'many plugs',
				])
			)
			.optional(),
		price: z.number().min(1).max(5).optional(),
		wifi: z.enum(['Fast', 'Medium', 'Slow']).optional(),
	}),
})

export const updateReviewSchema = z.object({
	body: z.object({
		userClicked: z.enum(['like', 'dislike']).optional(),
		reply: z.string().nonempty().optional(),
	}),
})

export type ReviewSchema = z.TypeOf<typeof createReviewSchema>
