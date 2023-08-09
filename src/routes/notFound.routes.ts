import { Router } from 'express'
import { RouteProps } from '../utils/types'

const router = Router()

router.use((req: RouteProps['req'], res: RouteProps['res']) => {
	return res.status(404).json({ message: 'resource not found' })
})

export default router
