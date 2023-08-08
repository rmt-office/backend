import mongoose from 'mongoose'
import z from 'zod'

export const createPlaceSchema = z.object({
	body: z.object({
		name: z.string(),
		category: z.enum(['Café', 'Airport', 'Hotel Lobby', 'Library', 'Coworking']),
		contactInfo: z.object({
			website: z.string().url().optional(),
			facebook: z.string().url().optional(),
			linkedIn: z.string().url().optional(),
			instagram: z.string().optional(),
			telephone: z.string().optional(),
		}),
		price: z.number().min(1).max(5).optional(),
		meetingRoom: z.number().min(0).optional(),
		bathrooms: z.number().min(0).optional(),
		description: z.string().optional(),
		wifiSpeed: z.enum(['Fast', 'Medium', 'Slow']).optional(),
		tags: z
			.object({
				hasFood: z.boolean(),
				hasDrink: z.boolean(),
				hasCafeteria: z.boolean(),
				isAccessible: z.boolean(),
				isVegan: z.boolean(),
				isVegetarian: z.boolean(),
			})
			.optional(),
		reviews: z.string().array().optional(),
		ownership: z.string().optional(),
		photos: z.string().array().optional(),
		// TODO: change after address routes are ready
		address: z.string().optional(),
	}),
	payload: z.object({
		_id: z.string(),
	}),
})

export type PlaceSchema = z.TypeOf<typeof createPlaceSchema>

export const findOnePlaceSchema = z.object({
	params: z.object({
		id: z.string().refine(data => mongoose.isValidObjectId(data), {
			message: 'Invalid Id',
			path: ['Find One'],
		}),
	}),
})
