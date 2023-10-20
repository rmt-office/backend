import { Router } from 'express'
import placeController from '../controllers/place.controller'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { isAdmin } from '../middlewares/isAdmin'
import { validate } from '../middlewares/validate'
import { createPlaceSchema, updatePlaceSchema } from '../validationSchema/Place.schema'
import { onlyAdmin } from '../middlewares/onlyAdmin'
import { testIdSchema } from '../validationSchema/Id.schema'

const router = Router()

router.get('/', placeController.getAll)
router.get('/filter', placeController.getByFilters)
router.get('/:id', validate(testIdSchema('Find One')), placeController.getOne)

router.use(isAuthenticated)
router.use(isAdmin)
router.post('/', validate(createPlaceSchema), placeController.create)
router.get('/filter', placeController.getByFilters)
router.get('/:id', validate(testIdSchema('Find One')), placeController.getOne)
router.put(
	'/:id',
	onlyAdmin,
	validate(testIdSchema('Update')),
	validate(updatePlaceSchema),
	placeController.update
)
router.delete('/:id', onlyAdmin, validate(testIdSchema('Delete')), placeController.delete)

export default router
