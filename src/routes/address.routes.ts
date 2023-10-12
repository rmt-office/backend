import { Router } from 'express'
import addressController from '../controllers/address.controller'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { isAdmin } from '../middlewares/isAdmin'
import { validate } from '../middlewares/validate'
import {
	createAddressSchema,
	testIdAddressSchema,
	updateAddressSchema,
} from '../validationSchema/Address.schema'
import { onlyAdmin } from '../middlewares/onlyAdmin'

const router = Router()

router.get('/', addressController.getAll)

router.use(isAuthenticated, isAdmin)
router.post('/', validate(createAddressSchema), addressController.create)
router.get('/filter', validate(updateAddressSchema), addressController.getByFilters)
router.get('/:id', validate(testIdAddressSchema('Find One')), addressController.getOne)
router.put(
	'/:id',
	onlyAdmin,
	validate(testIdAddressSchema('Update')),
	validate(updateAddressSchema),
	addressController.update
)
router.delete('/:id', onlyAdmin, validate(testIdAddressSchema('Delete')), addressController.delete)

export default router
