import express from 'express';
import * as allergenController from '../controllers/allergen-controller.js';

const router = express.Router();

router.get('/', allergenController.getAllAllergens);
router.post('/', allergenController.createAllergen);

export default router;
