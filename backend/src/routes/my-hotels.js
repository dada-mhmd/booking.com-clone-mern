import express from 'express';
import { createHotel } from '../controllers/myHotelsCtrl.js';
import { upload } from '../utils/multer.js';
import { verifyToken } from '../middelwares/verifyToken.js';
import { body } from 'express-validator';
const router = express.Router();

router.post('/',verifyToken,[
    body('name').notEmpty().withMessage('Name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('adultCount').notEmpty().withMessage('Adult count is required'),
    body('childCount').notEmpty().withMessage('Child count is required'),
    body('pricePerNight').notEmpty().isNumeric().withMessage('Price per night is required and must be a number'),
    body('faicilities').notEmpty().isArray().withMessage('Faicilities  are required'),
],upload.array('imageFiles',6) , createHotel)

export default router;