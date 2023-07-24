import { Schema, model } from "mongoose"

export const createModel = <TSchema extends Document>(genericSchema: TSchema, schemaName: string) => {
  const schema = new Schema<TSchema>(genericSchema, { timestamps: true })
  return model(schemaName, schema)
}