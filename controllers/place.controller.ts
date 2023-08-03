import { RouteProps } from '../utils/types'
import { NewPlace } from '../models/Place.model'
import placeServices from '../services/Place.service'
import { checkRequired } from '../utils/checkInput'
import { createError, throwError } from '../utils/throwError'

class PlaceController {
	async create(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const creator = req.payload!._id!
		const newPlace: NewPlace = {
			name: req.body.name,
			category: req.body.category,
			contactInfo: req.body.contactInfo,
			price: req.body.price,
			meetingRoom: req.body.meetingRoom,
			bathrooms: req.body.bathrooms,
			description: req.body.description,
			wifiSpeed: req.body.wifiSpeed,
			isPrivate: req.body.isPrivate,
			tags: req.body.tags,
			ownership: req.body.ownership,
			photos: req.body.photos,
			address: req.body.address,
			creator,
		}

		try {
			checkRequired(newPlace.name, 'Name')
			checkRequired(newPlace.category, 'Category')
			checkRequired(newPlace.contactInfo, 'Contact Info')

			const placeCreated = await placeServices.createPlace(newPlace)

			res.status(200).json({ message: 'it works create', placeCreated })
		} catch (error: any) {
			error.place = 'Create a new place'
			next(error)
		}
	}
	async getAll(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		try {
			res.status(200).json({ message: 'it works get all' })
		} catch (error: any) {
			error.place = 'Get all places'
			next(error)
		}
	}
	async getByFilters(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		try {
			res.status(200).json({ message: 'it works filters' })
		} catch (error: any) {
			error.place = 'Get place by filtering'
			next(error)
		}
	}
	async getOne(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		try {
			res.status(200).json({ message: 'it works get one' })
		} catch (error: any) {
			error.place = 'Get one place'
			next(error)
		}
	}
	async update(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		try {
			res.status(200).json({ message: 'it works update' })
		} catch (error: any) {
			error.place = 'Update place'
			next(error)
		}
	}
	async delete(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const { id } = req.params
		try {
			const deleted = await placeServices.deleteOne({ _id: id })
			if (deleted === null) {
				const error = createError('Already deleted', 400)
				throwError(error)
			}
			res.status(204).json()
		} catch (error: any) {
			error.place = 'Delete place'
			next(error)
		}
	}
}

export default new PlaceController()
