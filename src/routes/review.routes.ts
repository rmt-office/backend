import { Router } from 'express'
import reviewController from '../controllers/review.controller'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { isAdmin } from '../middlewares/isAdmin'
import { validate } from '../middlewares/validate'
import { createReviewSchema, updateReviewSchema } from '../validationSchema/Review.schema'
import { testIdSchema } from '../validationSchema/Id.schema'

const router = Router()

//TODO: check usability
// router.get('/', reviewController.getAll)
// router.get('/filter', validate(updateReviewSchema), reviewController.getByFilters)

router.use(isAuthenticated)
router.use(isAdmin)
//ID related to the place and not to the review
router.post(
	'/:placeId',
	validate(testIdSchema('Create review')),
	validate(createReviewSchema),
	reviewController.create
)
router.get('/:id', validate(testIdSchema('Find One')), reviewController.getOne)
router.put(
	'/:id',
	validate(testIdSchema('Update')),
	validate(updateReviewSchema),
	reviewController.update
)
router.delete('/:id', validate(testIdSchema('Delete')), reviewController.delete)

export default router
