import { Router } from 'express'
import placeController from '../controllers/place.controller'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { isAdmin } from '../middlewares/isAdmin'
import { validate } from '../middlewares/validate'
import {
	createPlaceSchema,
	testIdPlaceSchema,
	updatePlaceSchema,
} from '../validationSchema/Place.schema'

const router = Router()

router.get('/', placeController.getAll)
router.get('/filter', placeController.getByFilters)
router.get('/:id', validate(testIdPlaceSchema('Find One')), placeController.getOne)

router.use(isAuthenticated)
router.post('/', validate(createPlaceSchema), placeController.create)
router.put(
	'/:id',
	isAdmin,
	validate(testIdPlaceSchema('Update')),
	validate(updatePlaceSchema),
	placeController.update
)
router.delete('/:id', isAdmin, validate(testIdPlaceSchema('Delete')), placeController.delete)

export default router
