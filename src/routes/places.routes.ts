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
import { onlyAdmin } from '../middlewares/onlyAdmin'

const router = Router()

router.get('/', placeController.getAll)

router.use(isAuthenticated, isAdmin)
router.post('/', validate(createPlaceSchema), placeController.create)
router.get('/filter', placeController.getByFilters)
router.get('/:id', validate(testIdPlaceSchema('Find One')), placeController.getOne)
router.put(
	'/:id',
	onlyAdmin,
	validate(testIdPlaceSchema('Update')),
	validate(updatePlaceSchema),
	placeController.update
)
router.delete('/:id', onlyAdmin, validate(testIdPlaceSchema('Delete')), placeController.delete)

export default router
