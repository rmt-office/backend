import { Router } from "express";
import placeController from "../controllers/place.controller";

const router = Router()

router.post('/', placeController.create)
router.get('/', placeController.getAll)
router.get('/filter', placeController.getByFilters)
router.get('/:id', placeController.getOne)
router.put('/:id', placeController.update)
router.delete('/:id', placeController.delete)

export default router