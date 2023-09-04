import { NewPlace, Place, PlaceModel } from '../models/Place.model'
import {
	UpdateProps,
	create,
	deleteOne,
	find,
	findOne,
	findOneAndUpdate,
} from '../database/mongooseServices'

type UpdateOptions = UpdateProps<Place>
type FilterOptions = UpdateOptions['filter']
type QueryOptions = UpdateOptions['options']

class PlaceServices {
	async createPlace(newPlace: NewPlace) {
		return create(PlaceModel, newPlace)
	}

	async findAll() {
		return find(PlaceModel)
	}

	async findByFilters(filter: FilterOptions, options?: QueryOptions) {
		return find(PlaceModel, filter, options)
	}

	async findOne(filter: FilterOptions, options?: QueryOptions) {
		return findOne(PlaceModel, filter, options)
	}

	async findOneAndUpdate(updateOptions: UpdateOptions) {
		return findOneAndUpdate(PlaceModel, updateOptions)
	}

	async deleteOne(filter: FilterOptions) {
		return deleteOne(PlaceModel, filter)
	}
}

export default new PlaceServices()
