import { Router } from 'express'
import addressController from '../controllers/address.controller'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { isAdmin } from '../middlewares/isAdmin'
import { onlyAdmin } from '../middlewares/onlyAdmin'
import { validate } from '../middlewares/validate'
import { createAddressSchema, updateAddressSchema } from '../validationSchema/Address.schema'
import { testIdSchema } from '../validationSchema/Id.schema'

const router = Router()

router.get('/', addressController.getAll)

router.use(isAuthenticated)
router.use(isAdmin)
router.post('/', validate(createAddressSchema), addressController.create)
router.get('/filter', validate(updateAddressSchema), addressController.getByFilters)
router.get('/:id', validate(testIdSchema('Find One')), addressController.getOne)
router.put(
	'/:id',
	onlyAdmin,
	validate(testIdSchema('Update')),
	validate(updateAddressSchema),
	addressController.update
)
router.delete('/:id', onlyAdmin, validate(testIdSchema('Delete')), addressController.delete)

export default router
