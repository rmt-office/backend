import { Router } from "express";
import placeController from "../controllers/place.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router()

router.use(isAuthenticated)
router.post('/', placeController.create)
router.get('/', placeController.getAll)
router.get('/filter', placeController.getByFilters)
router.get('/:id', placeController.getOne)
router.put('/:id', placeController.update)
router.delete('/:id', isAdmin, placeController.delete)

export default router