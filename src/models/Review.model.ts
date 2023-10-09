import { Schema, model, HydratedDocument, InferSchemaType } from 'mongoose'

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
			required: true,
		},
		tags: {
			type: String,
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
			min: 0,
			max: 100,
		},
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
				owner: true,
				ref: 'User',
			},
		},
	},
	{
		timestamps: true,
	}
)

const ReviewModel = model('Review', reviewSchema)
type Review = InferSchemaType<typeof reviewSchema>
type ReviewHydrate = HydratedDocument<typeof reviewSchema>

export { ReviewModel, Review, ReviewHydrate }
