import * as ingredientService from '../services/ingredient-service.js';



export const getAllIngredients = async (req, res) => {
    try {
        const ingredients = await ingredientService.getAllIngredients();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const createIngredient = async (req, res) => {
    try {
        const { name } = req.body; 
        if (!name || name.trim() === '') {
            throw new Error('Name is required');
        }
        const ingredient = await ingredientService.createIngredient({ name }); 
        res.status(201).json(ingredient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const getIngredientById = async (req, res) => {
    try {
        const ingredient = await ingredientService.getIngredientById(req.params.id);
        if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });
        res.status(200).json(ingredient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateIngredient = async (req, res) => {
    try {
        const updatedIngredient = await ingredientService.updateIngredient(req.params.id, req.body);
        res.status(200).json(updatedIngredient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const deleteIngredient = async (req, res) => {
    try {
      await ingredientService.deleteIngredient(req.params.id); 
      res.status(204).send(); 
    } catch (error) {
      console.error(`Error in deleteIngredient: ${error.message}`);
      res.status(500).json({ error: error.message }); 
    }
  };



export const getAllergensForIngredient = async (req, res) => {
    try {
        const allergens = await ingredientService.getAllergensForIngredient(req.params.ingredientId);
        res.status(200).json(allergens);
    } catch (error) {
        if (error.message === 'Ingredient not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};


export const tagAllergenToIngredient = async (req, res) => {
    const { allergen } = req.body;
    if (!allergen) {
        return res.status(400).json({ error: 'Invalid input: allergen is required' });
    }

    try {
        const taggedAllergen = await ingredientService.tagAllergenToIngredient(req.params.ingredientId, allergen);
        res.status(201).json(taggedAllergen);
    } catch (error) {
        if (error.message === 'Ingredient not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
