import { Schema, model, HydratedDocument, InferSchemaType } from 'mongoose'
import { Timestamps } from '../utils/types'

const reviewSchema = new Schema(
	{
		score: {
			type: Number,
			max: 5,
			min: 1,
			required: true,
		},
		comment: {
			type: String,
		},
		tags: {
			type: [String],
			enum: [
				'quiet place',
				'good internet connection',
				'good location',
				'easy to find a place',
				'many plugs',
			],
		},
		price: {
			type: Number,
			min: 1,
			max: 5,
		},
		//TODO: attach a link to do a speed test and values to know what's fast, medium and slow
		wifi: {
			type: String,
			enum: ['Fast', 'Medium', 'Slow'],
		},
		like: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		dislike: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		reply: {
			text: {
				type: String,
				ref: 'User',
			},
		},
		creator: {
			type: Schema.Types.ObjectId, 
			ref: 'User'}
	},
	{
		timestamps: true,
	}
)

const ReviewModel = model('Review', reviewSchema)
type Review = InferSchemaType<typeof reviewSchema>
type ReviewHydrate = HydratedDocument<typeof reviewSchema>
type NewReview = Omit<Review, keyof Timestamps | "creator"> & {creator: string}

export { ReviewModel, Review, ReviewHydrate, NewReview }
