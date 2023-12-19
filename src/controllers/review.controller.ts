import { RouteProps } from '../utils/types'
import { NewReview } from '../models/Review.model'
import reviewServices from '../services/Review.service'
import { createError, throwError } from '../utils/throwError'
import placeService from '../services/Place.service'
import { Types, ObjectId } from 'mongoose'

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
			reply: '',
			creator: req.payload?._id!,
		}

		try {
			const reviewCreated = await reviewServices.createReview(newReview)

			const placeUpdated = await placeService.findOneAndUpdate({
				filter: { _id: req.params.placeId },
				infoUpdate: { $addToSet: { reviews: reviewCreated._id } },
				options: { new: true, populate: { path: 'reviews', options: { sort: { createdAt: -1 } } } },
			})

			res.status(200).json({ review: reviewCreated, place: placeUpdated })
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
		const user = new Types.ObjectId(req.payload?._id!)
		const clicked: 'like' | 'dislike' = req.body.userClicked
		const otherArray = clicked === 'like' ? 'dislike' : 'like'

		try {
			//TODO: Independent calls, change to Promise.All
			const placeFromDB = await placeService.findOne({ reviews: id })
			const updatedReview = await reviewServices.findOne({ _id: id })

			if (!placeFromDB) {
				const error = createError(`The place seems to not exist anymore`, 404)
				return throwError(error)
			}

			if (!updatedReview) {
				const error = createError(`The review seems to not exist anymore`, 404)
				return throwError(error)
			}

			if (
				req.body.reply &&
				placeFromDB.ownership &&
				placeFromDB.ownership.toString() === user.toString()
			) {
				updatedReview.reply = req.body.reply
				await updatedReview.save()
				return res.status(200).json(updatedReview)
			}

			if (updatedReview[clicked]?.includes(user)) {
				updatedReview[clicked] = updatedReview[clicked].filter(
					(id) => id.toString() !== user.toString()
				)
				await updatedReview.save()
			} else {
				updatedReview[clicked].push(user)
				if (updatedReview[otherArray]?.includes(user)) {
					updatedReview[otherArray] = updatedReview[otherArray].filter(
						(id) => id.toString() !== user.toString()
					)
				}
				await updatedReview.save()
			}

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
			if (req.isAdmin) {
				const deleted = await reviewServices.deleteOne({ _id: id })
				if (deleted === null) {
					const error = createError(`Already deleted`, 400)
					return throwError(error)
				}
				return res.status(204).json()
			}
			const deleted = await reviewServices.deleteOne({ _id: id, creator })
			if (deleted === null) {
				const error = createError(
					`Already deleted or you don't have the permission to delete that resource`,
					400
				)
				return throwError(error)
			}
			res.status(204).json()
		} catch (error: any) {
			error.place = 'Delete review'
			next(error)
		}
	}
}

export default new ReviewController()
