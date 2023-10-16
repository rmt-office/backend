import { RouteProps } from '../utils/types'
import { NewPlace } from '../models/Place.model'
import placeServices from '../services/Place.service'
import { createError, throwError } from '../utils/throwError'
import { NewAddress } from '../models/Address.model'
import addressService from '../services/Address.service'

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
			reviews: [],
			creator,
		}

		const newAddress: NewAddress = { ...req.body.address }

		try {
			const addressCreated = await addressService.createAddress(newAddress)

			const placeCreated = await placeServices.createPlace({
				...newPlace,
				address: addressCreated._id,
			})

			res.status(200).json(placeCreated)
		} catch (error: any) {
			error.place = 'Create a new place'
			next(error)
		}
	}

	async getAll(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		try {
			const places = await placeServices.findAll()
			res.status(200).json(places)
		} catch (error: any) {
			error.place = 'Get all places'
			next(error)
		}
	}

	async getByFilters(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const { tags } = req.body
		const tagsRenamed: { [key: string]: boolean } = {}
		for (let tag in tags) {
			const newName = `tags.${tag}`
			tagsRenamed[newName] = tags[tag]
		}
		delete req.body.tags

		try {
			const filtered = await placeServices.findByFilters({ ...req.body, ...tagsRenamed })
			res.status(200).json(filtered)
		} catch (error: any) {
			error.place = 'Get place by filtering'
			next(error)
		}
	}

	async getOne(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const { id } = req.params
		try {
			const place = await placeServices.findOne({ _id: id })
			res.status(200).json(place)
		} catch (error: any) {
			error.place = 'Get one place'
			next(error)
		}
	}

	async update(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const { id } = req.params
		const placeToUpdate: Omit<NewPlace, 'creator' | 'reviews'> = {
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
		}
		try {
			const updatedPlace = await placeServices.findOneAndUpdate({
				filter: { _id: id },
				infoUpdate: placeToUpdate,
				options: { new: true, runValidators: true },
			})
			res.status(200).json(updatedPlace)
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
