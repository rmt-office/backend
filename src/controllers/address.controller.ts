import { RouteProps } from '../utils/types'
import { NewAddress } from '../models/Address.model'
import addressServices from '../services/Address.service'
import { createError, throwError } from '../utils/throwError'

class AddressController {
	async create(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const newAddress: NewAddress = {
			country: req.body.country,
			city: req.body.city,
			street: req.body.street,
			zipCode: req.body.zipCode
		}

		try {
			const addressCreated = await addressServices.createAddress(newAddress)

			res.status(200).json({ message: 'address created', addressCreated })
		} catch (error: any) {
			error.place = 'Create a new address'
			next(error)
		}
	}

	async getAll(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		try {
			const addresses = await addressServices.findAll()
			res.status(200).json(addresses)
		} catch (error: any) {
			error.place = 'Get all addresses'
			next(error)
		}
	}

    //TODO - check usability
	async getByFilters(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		try {
			const filtered = await addressServices.findByFilters({ ...req.body })
			res.status(200).json(filtered)
		} catch (error: any) {
			error.place = 'Get address by filtering'
			next(error)
		}
	}

	async getOne(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const { id } = req.params
		try {
			const address = await addressServices.findOne({ _id: id })
			res.status(200).json(address)
		} catch (error: any) {
			error.place = 'Get one address'
			next(error)
		}
	}

	async update(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const { id } = req.params
		const addressToUpdate: Omit<NewAddress, 'creator'> = {
			country: req.body.country,
			city: req.body.city,
			street: req.body.street,
			zipCode: req.body.zipCode,
		}
		try {
			const updatedAddress = await addressServices.findOneAndUpdate({
				filter: { _id: id },
				infoUpdate: addressToUpdate,
				options: { new: true, runValidators: true },
			})
			res.status(200).json(updatedAddress)
		} catch (error: any) {
			error.place = 'Update address'
			next(error)
		}
	}

	async delete(req: RouteProps['payload'], res: RouteProps['res'], next: RouteProps['next']) {
		const { id } = req.params
		try {
			const deleted = await addressServices.deleteOne({ _id: id })
			if (deleted === null) {
				const error = createError('Already deleted', 400)
				throwError(error)
			}
			res.status(204).json()
		} catch (error: any) {
			error.place = 'Delete address'
			next(error)
		}
	}
}

export default new AddressController()
