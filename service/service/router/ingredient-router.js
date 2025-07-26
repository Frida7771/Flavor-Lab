import express from 'express';
import * as ingredientController from '../controllers/ingredient-controller.js';

const router = express.Router();

router.get('/', ingredientController.getAllIngredients);
router.post('/', ingredientController.createIngredient);
router.get('/:id', ingredientController.getIngredientById);
router.put('/:id', ingredientController.updateIngredient);
router.get('/:ingredientId/allergies', ingredientController.getAllergensForIngredient);
router.post('/:ingredientId/allergies', ingredientController.tagAllergenToIngredient);
router.delete('/:id', ingredientController.deleteIngredient);

export default router;
