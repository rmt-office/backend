import { RouteProps } from '../utils/types'
import { NewReview } from '../models/Review.model'
import reviewServices from '../services/Review.service'
import { createError, throwError } from '../utils/throwError'
import placeService from '../services/Place.service'

class ReviewController {
	async create(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		//TODO: Check types
        const newReview: NewReview = {
			score: req.body.score,
			comment: req.body.comment,
			tags: req.body.tags,
			price: req.body.price,
            wifi: req.body.wifi,
            like: [],
            dislike: [],
            reply: {},
            creator: req.payload?._id!,
		}

		try {
			const reviewCreated = await reviewServices.createReview(newReview)

        const placeUpdated = await placeService.findOneAndUpdate({filter:{_id:req.params.id}, infoUpdate: {$addToSet:{reviews:reviewCreated._id}}, options:{new:true}})


			res.status(200).json({review: reviewCreated, place: placeUpdated})
		} catch (error: any) {
			error.place = 'Create a new review'
			next(error)
		}
	}

    //TODO - check usability
	// async getAll(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
	// 	try {
	// 		const reviews = await reviewServices.findAll()
	// 		res.status(200).json(reviews)
	// 	} catch (error: any) {
	// 		error.place = 'Get all reviews'
	// 		next(error)
	// 	}
	// }

	// async getByFilters(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
	// 	try {
	// 		const filtered = await reviewServices.findByFilters({ ...req.body })
	// 		res.status(200).json(filtered)
	// 	} catch (error: any) {
	// 		error.place = 'Get review by filtering'
	// 		next(error)
	// 	}
	// }

    
	async getOne(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const { id } = req.params
		try {
			const review = await reviewServices.findOne({ _id: id })
			res.status(200).json(review)
		} catch (error: any) {
			error.place = 'Get one review'
			next(error)
		}
	}

	async update(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const { id } = req.params
		const reviewToUpdate: Partial<NewReview> = {
			score: req.body.score,
			comment: req.body.comment,
			tags: req.body.tags,
			price: req.body.price,
            wifi: req.body.wifi,
            like: req.body.like,
            dislike: req.body.dislike,
            reply: req.body.reply,
		}
		try {
			const updatedReview = await reviewServices.findOneAndUpdate({
				filter: { _id: id },
				infoUpdate: reviewToUpdate,
				options: { new: true, runValidators: true },
			})
			res.status(200).json(updatedReview)
		} catch (error: any) {
			error.place = 'Update review'
			next(error)
		}
	}

	async delete(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const { id } = req.params
        const creator = req.payload?._id

		try {
			const deleted = await reviewServices.deleteOne({ _id: id, creator })
			if (deleted === null) {
				const error = createError('Already deleted', 400)
				throwError(error)
			}
			res.status(204).json()
		} catch (error: any) {
			error.place = 'Delete review'
			next(error)
		}
	}
}

export default new ReviewController()
