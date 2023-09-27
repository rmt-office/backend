import mongoose from 'mongoose'
import z from 'zod'

export const createAddressSchema = z.object({
	body: z.object({
		country: z.string(),
		city: z.string(),
		street: z.string(),
		zipCode: z.string(),
	}),
})

export const updateAddressSchema = createAddressSchema.deepPartial()

export type AddressSchema = z.TypeOf<typeof createAddressSchema>

export const testIdAddressSchema = (path: string) => {
	return z.object({
		params: z.object({
			id: z.string().refine(data => mongoose.isValidObjectId(data), {
				message: 'Invalid Id',
				path: [path],
			}),
		}),
	})
}
