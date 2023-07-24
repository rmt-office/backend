import { Model } from "mongoose"

export const create = <TModel, TCreate>(model: Model<TModel>, create: TCreate) => {
  return model.create(create)
}

export const findAll = <TModel>(model: Model<TModel>) => {
  return model.find()
}

