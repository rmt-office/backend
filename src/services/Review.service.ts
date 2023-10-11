import { NewReview, Review, ReviewModel } from '../models/Review.model'
import {
	UpdateProps,
	create,
	deleteOne,
	find,
	findOne,
	findOneAndUpdate,
} from '../database/mongooseServices'

type UpdateOptions = UpdateProps<Review>
type FilterOptions = UpdateOptions['filter']
type QueryOptions = UpdateOptions['options']

class ReviewServices {
	async createReview(newReview: NewReview) {
		return create(ReviewModel, newReview)
	}

	async findAll() {
		return find(ReviewModel)
	}

	async findByFilters(filter: FilterOptions, options?: QueryOptions) {
		return find(ReviewModel, filter, options)
	}

	async findOne(filter: FilterOptions, options?: QueryOptions) {
		return findOne(ReviewModel, filter, options)
	}

	async findOneAndUpdate(updateOptions: UpdateOptions) {
		return findOneAndUpdate(ReviewModel, updateOptions)
	}

	async deleteOne(filter: FilterOptions) {
		return deleteOne(ReviewModel, filter)
	}
}

export default new ReviewServices()
