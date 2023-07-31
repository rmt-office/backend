import { Router } from "express";
import upload from '../utils/cloudinary'

const router = Router()

// Change route path
router.post('/picture', upload.single('image'), (req, res, next) => {
  try {
    if (req.file) {
      res.status(200).json(req.file.path)
    } else {
      res.status(204).json()
    }
  } catch (error: any) {
    error.place = 'File upload'
    next(error)
  }
})

export default router
