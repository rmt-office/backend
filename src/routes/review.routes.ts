import { Router } from 'express'
import reviewController from '../controllers/review.controller'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { isAdmin } from '../middlewares/isAdmin'
import { validate } from '../middlewares/validate'
import {
	createReviewSchema,
	testIdReviewSchema,
	updateReviewSchema,
} from '../validationSchema/Review.schema'

const router = Router()

//TODO: check usability
// router.get('/', reviewController.getAll)
// router.get('/filter', validate(updateReviewSchema), reviewController.getByFilters)

router.use(isAuthenticated)
router.post('/:id', validate(createReviewSchema), reviewController.create)
router.get('/:id', validate(testIdReviewSchema('Find One')), reviewController.getOne)
router.put(
	'/:id',
	isAdmin,
	validate(testIdReviewSchema('Update')),
	validate(updateReviewSchema),
	reviewController.update
)
router.delete('/:id', isAdmin, validate(testIdReviewSchema('Delete')), reviewController.delete)

export default router
