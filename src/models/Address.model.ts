import { Schema, model, HydratedDocument, InferSchemaType } from 'mongoose'
import { Timestamps } from '../utils/types'

const addressSchema = new Schema(
	{
            country:{
              type: String,
              required: true
            },
            city:{
              type: String,
              required: true
            },
            street:{
              type: String,
              required: true
            },
        zipCode: { type: String }
        },

        {
		timestamps: true,
        }
)

const AddressModel = model('Address', addressSchema)
type Address = InferSchemaType<typeof addressSchema>
type AddressHydrate = HydratedDocument<typeof addressSchema>
type NewAddress = Omit<Address, keyof Timestamps> 

export { AddressModel, Address, AddressHydrate, NewAddress }