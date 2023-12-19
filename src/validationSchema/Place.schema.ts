import z from 'zod'

export const createPlaceSchema = z.object({
	body: z.object({
		name: z.string(),
		category: z.enum(['Café', 'Airport', 'Hotel Lobby', 'Library', 'Coworking']),
		contactInfo: z.object({
			website: z.string().url().optional(),
			facebook: z.string().url().optional(),
			linkedIn: z.string().url().optional(),
			instagram: z.string().nonempty().optional(),
			telephone: z.string().nonempty().optional(),
		}),
		price: z
			.number()
			.min(1, { message: 'Price must be between 1 and 5' })
			.max(5, { message: 'Price must be between 1 and 5' })
			.optional(),
		meetingRoom: z.number().min(0, { message: 'Meeting Rooms must be at least 0' }).optional(),
		bathrooms: z.number().min(0, { message: 'Bathrooms must be at least 0' }).optional(),
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
		isPrivate: z.boolean().optional(),
		// TODO: change after address routes are ready - maybe to be deleted
		address: z.object({
			country: z.string().nonempty(),
			city: z.string().nonempty(),
			street: z.string().nonempty(),
			zipCode: z.string().nonempty(),
		}),
	}),
})

export const updatePlaceSchema = createPlaceSchema.deepPartial()

export type PlaceSchema = z.TypeOf<typeof createPlaceSchema>
