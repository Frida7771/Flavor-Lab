import Ingredient from '../models/Ingredient.js';
import Allergen from '../models/Allergen.js'


export const getAllIngredients = async () => {
    return await Ingredient.find().populate('allergens');
};


export const createIngredient = async (data) => {
    const ingredient = new Ingredient(data); 
    return await ingredient.save();
};


export const getIngredientById = async (id) => {
    return await Ingredient.findById(id).populate('allergens');
};

export const updateIngredient = async (id, data) => {
    return await Ingredient.findByIdAndUpdate(id, data, { new: true });
};


export const deleteIngredient = async (id) => {
    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      throw new Error(`Ingredient with ID ${id} not found.`);
    }
  
    await Ingredient.findByIdAndDelete(id); 
  };


export const getAllergensForIngredient = async (ingredientId) => {
    const ingredient = await Ingredient.findById(ingredientId).populate('allergens');
    if (!ingredient) throw new Error('Ingredient not found');
    return ingredient.allergens;
};


export const tagAllergenToIngredient = async (ingredientId, allergenName) => {
    const ingredient = await Ingredient.findById(ingredientId);
    if (!ingredient) throw new Error('Ingredient not found');

    let allergen = await Allergen.findOne({ name: allergenName });
    if (!allergen) {
        
        allergen = new Allergen({ name: allergenName });
        await allergen.save();
    }

    
    if (!ingredient.allergens.includes(allergen._id)) {
        ingredient.allergens.push(allergen._id);
        await ingredient.save();
    }

    return allergen;
};

