import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME, 
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    //@ts-expect-error
    folder: 'remote-office',
    allowedFormats: ['jpg']
  }
})

export default multer({ storage })