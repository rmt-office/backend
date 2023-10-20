import { Schema, model, HydratedDocument, InferSchemaType } from 'mongoose'
import { Timestamps } from '../utils/types'

const placeSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			enum: ['Café', 'Airport', 'Hotel Lobby', 'Library', 'Coworking'],
			required: true,
		},
		address: {
			type: Schema.Types.ObjectId,
			ref: 'Address',
			required: false,
		},
		description: String,
		contactInfo: {
			type: {
				website: String,
				telephone: String,
				linkedIn: String,
				instagram: String,
				facebook: String,
			},
			required: true,
		},
		price: {
			type: Number,
			min: 1,
			max: 5,
		},
		meetingRoom: {
			type: Number,
			min: 0,
		},
		bathrooms: {
			type: Number,
			min: 0,
		},
		wifiSpeed: {
			type: String,
			enum: ['Fast', 'Medium', 'Slow'],
		},
		isPrivate: {
			type: Boolean,
			condition: String,
		},
		tags: {
			hasFood: Boolean,
			hasDrink: Boolean,
			hasCafeteria: Boolean,
			isAccessible: Boolean,
			isVegan: Boolean,
			isVegetarian: Boolean,
		},
		reviews: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Review',
			},
		],
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		ownership: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		photos: {
			type: [String],
			required: false,
		},
	},
	{
		timestamps: true,
	}
)

const PlaceModel = model('Place', placeSchema)
type Place = InferSchemaType<typeof placeSchema>
type PlaceHydrate = HydratedDocument<typeof placeSchema>
type PlaceSub = Omit<Place, 'creator'>
type NewPlace = Omit<PlaceSub, keyof Timestamps> & { creator: string }

export { PlaceModel, Place, PlaceHydrate, NewPlace }
