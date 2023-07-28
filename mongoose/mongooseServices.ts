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
	update: UpdateProps
) => {
	return model.findOneAndUpdate(update.filter, update.infoUpdate, update?.options)
}
