import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose'
import { Timestamps } from '../utils/types'

type FilterOptions<TModel> = FilterQuery<TModel> & { _id?: string }
type UpdateOptions<TModel> = UpdateQuery<TModel> | Partial<TModel>
type QueryOpts<TModel> = QueryOptions<TModel>

export type NoTimestamps<T> = Omit<T, keyof Timestamps>

export type UpdateProps<T> = {
	filter: FilterOptions<T>
	infoUpdate: UpdateOptions<T>
	options?: QueryOpts<T>
}

export const create = <TModel, TCreate>(model: Model<TModel>, create: TCreate) => {
	return model.create(create)
}

export const find = <TModel>(
	model: Model<TModel>,
	filter?: FilterOptions<TModel>,
	options?: QueryOpts<TModel>
) => {
	if (filter) {
		return model.find(filter, {}, options)
	}
	return model.find({}, {}, options)
}

export const findOne = <TModel>(
	model: Model<TModel>,
	filter: FilterOptions<TModel>,
	options?: QueryOpts<TModel>
) => {
	return model.findOne(filter, options)
}

export const findOneAndUpdate = <TModel>(
	model: Model<TModel>,
	{ filter, infoUpdate, options }: UpdateProps<TModel>
) => {
	return model.findOneAndUpdate(filter, infoUpdate, options)
}

export const deleteOne = <TModel>(model: Model<TModel>, filter: FilterOptions<TModel>) => {
	return model.findOneAndDelete(filter)
}
