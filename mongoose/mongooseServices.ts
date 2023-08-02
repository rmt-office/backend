import { FilterQuery, HydratedDocument, InferSchemaType, Model, QueryOptions, UpdateQuery } from 'mongoose'

type FilterConstraint<TDoc> = {
	[Prop in keyof TDoc]: TDoc[Prop]
}

type FilterOptions<TModel> = UpdateProps<HydratedDocument<TModel>>['filter']
type UpdateOptions<TModel> = UpdateProps<HydratedDocument<TModel>>

export type UpdateProps<T> =  { 
	filter: FilterQuery<FilterConstraint<InferSchemaType<T>> & { _id: string }>
	infoUpdate: UpdateQuery<T> | FilterConstraint<InferSchemaType<T>>
	options?: QueryOptions<T>
}

export const create = <TModel, TCreate>(model: Model<TModel>, create: TCreate) => {
	return model.create(create)
}

export const findAll = <TModel>(model: Model<TModel>) => {
	return model.find()
}

export const findOne = <TModel>(model: Model<TModel>, filter: FilterOptions<TModel>, options?: UpdateOptions<TModel>['options'] ) => {
	return model.findOne(filter, options)
}

export const findOneAndUpdate = <TModel>(
	model: Model<TModel>,
	{ filter, infoUpdate, options }: UpdateOptions<TModel>
) => {
	return model.findOneAndUpdate(filter, infoUpdate, options)
}

export const deleteOne = <TModel>(model: Model<TModel>, filter: FilterOptions<TModel>) => {
	return model.findOneAndDelete(filter)
}
