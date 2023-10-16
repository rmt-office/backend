import { Router } from 'express'
import { RouteProps } from './utils/types'
import { errorHandling } from './routes/errorHandling.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import placesRoutes from './routes/places.routes'
import addressRoutes from './routes/address.routes'
import reviewRoutes from './routes/review.routes'
import notFound from './routes/notFound.routes'
import pictureUpload from './routes/pictureUpload.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/places', placesRoutes)
router.use('/addresses', addressRoutes)
router.use('/reviews', reviewRoutes)
router.use('/api', pictureUpload)

router.use(
	(
		error: RouteProps['error'],
		req: RouteProps['req'],
		res: RouteProps['res'],
		next: RouteProps['next']
	): RouteProps['res'] => errorHandling(error, res)
)

router.use(notFound)

export default router
