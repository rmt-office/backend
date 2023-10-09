import { NewAddress, Address, AddressModel } from '../models/Address.model'
import {
	UpdateProps,
	create,
	deleteOne,
	find,
	findOne,
	findOneAndUpdate,
} from '../database/mongooseServices'

type UpdateOptions = UpdateProps<Address>
type FilterOptions = UpdateOptions['filter']
type QueryOptions = UpdateOptions['options']

class AddressServices {
	async createAddress(newAddress: NewAddress) {
		return create(AddressModel, newAddress)
	}

	async findAll() {
		return find(AddressModel)
	}

	async findByFilters(filter: FilterOptions, options?: QueryOptions) {
		return find(AddressModel, filter, options)
	}

	async findOne(filter: FilterOptions, options?: QueryOptions) {
		return findOne(AddressModel, filter, options)
	}

	async findOneAndUpdate(updateOptions: UpdateOptions) {
		return findOneAndUpdate(AddressModel, updateOptions)
	}

	async deleteOne(filter: FilterOptions) {
		return deleteOne(AddressModel, filter)
	}
}

export default new AddressServices()
