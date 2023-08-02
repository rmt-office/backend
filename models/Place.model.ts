import { Schema, model, HydratedDocument, InferSchemaType } from 'mongoose'

const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Café', 'Airport', 'Hotel Lobby', 'Library', 'Coworking'],
      required: true
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true
    },
    description: String,
    photos: [String],
    contactInfo: {
      website: { String },
      telephone: { String },
      linkedIn: { String },
      instagram: { String },
      facebook: { String },
    },
    price: {
      type: Number,
      min: 1,
      max: 5
    },
    meetingRoom: {
      type: Number,
      min: 0
    },
    bathrooms: {
      type: Number,
      min: 0
    },
    wifiSpeed: {
      type: String,
      enum: ['Fast', 'Medium', 'Slow']
    },
    isPrivate: {
      type: Boolean,
      condition: String
    },
    tags: {
      hasFood: Boolean,
      hasDrink: Boolean,
      hasCafeteria: Boolean,
      isAccessible: Boolean,
      isVegan: Boolean,
      isVegetarian: Boolean
    },
    reviews: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    ownership: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
)

const PlaceModel = model('Place', placeSchema) 
type Place = InferSchemaType<typeof placeSchema>
type PlaceHydrate = HydratedDocument<typeof placeSchema>

export { PlaceModel, Place, PlaceHydrate }