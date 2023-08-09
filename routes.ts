import { Router } from 'express'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import placesRoutes from './routes/places.routes'
import { errorHandling } from './routes/errorHandling'
import { RouteProps } from './utils/types'
import pictureUpload from './routes/pictureUpload.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/places', placesRoutes)

router.use('/api', pictureUpload)

router.use(
	(
		error: RouteProps['error'],
		req: RouteProps['req'],
		res: RouteProps['res'],
		next: RouteProps['next']
	): RouteProps['res'] => errorHandling(error, res)
)

export default router
