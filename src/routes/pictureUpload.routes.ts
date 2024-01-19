import { Router } from 'express';
import upload from '../utils/cloudinary';

const router = Router();

// Change route path
// TODO: Add a controller
router.post('/picture', upload.single('image'), (req, res, next) => {
	try {
		if (req.file) {
			res.status(200).json(req.file.path);
		} else {
			res.sendStatus(204);
		}
	} catch (error: any) {
		error.place = 'File upload';
		next(error);
	}
});

router.post('/pictures', upload.array('images'), (req, res, next) => {
	try {
		if (req.files && Array.isArray(req.files) && req.files.length) {
			let imagesArray = req.files.map((e) => e.path);
			res.status(200).json(imagesArray);
		} else {
			res.sendStatus(204);
		}
	} catch (error: any) {
		error.place = 'Multiple files upload';
		next(error);
	}
});

export default router;
