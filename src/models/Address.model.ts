import { Schema, model, HydratedDocument, InferSchemaType } from 'mongoose'
import { Timestamps } from '../utils/types'

const addressSchema = new Schema(
	{
        address:{
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
        zipCode: { String? }
        },
		timestamps: true,
	}
)

const AddressModel = model('Address', addressSchema)
type Address = InferSchemaType<typeof addressSchema>
type AddressHydrate = HydratedDocument<typeof addressSchema>
type AddressSub = Omit<Address, 'creator'>
type NewAddress = Omit<AddressSub, keyof Timestamps> & { creator: string }

export { AddressModel, Address, AddressHydrate, NewAddress }