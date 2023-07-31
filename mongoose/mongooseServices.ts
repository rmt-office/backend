import { Model } from 'mongoose'
import { UpdateProps } from '../utils/types'

export const create = <TModel, TCreate>(model: Model<TModel>, create: TCreate) => {
	return model.create(create)
}

export const findAll = <TModel>(model: Model<TModel>) => {
	return model.find()
}

export const findOne = <TModel>(model: Model<TModel>, filter: {}) => {
	return model.findOne(filter)
}

export const findOneAndUpdate = <TModel>(
	model: Model<TModel>,
	{ filter, infoUpdate, options }: UpdateProps
) => {
	return model.findOneAndUpdate(filter, infoUpdate, options)
}

export const deleteOne = <TModel>(model: Model<TModel>, filter: {}) => {
	return model.findOneAndDelete(filter)
}
