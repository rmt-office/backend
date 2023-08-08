import { Router } from 'express'
import placeController from '../controllers/place.controller'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { isAdmin } from '../middlewares/isAdmin'
import { validate } from '../middlewares/validate'
import { createPlaceSchema, findOnePlaceSchema } from '../validationSchema/Place.schema'

const router = Router()

router.use(isAuthenticated)
router.post('/', validate(createPlaceSchema), placeController.create)
router.get('/', placeController.getAll)
router.get('/filter', placeController.getByFilters)
router.get('/:id', validate(findOnePlaceSchema), placeController.getOne)
router.put('/:id', isAdmin, placeController.update)
router.delete('/:id', isAdmin, placeController.delete)

export default router
