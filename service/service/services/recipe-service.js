import Recipe from "../models/recipe.js";


/**
 * Get all recipes from the database
 */
export const getAllRecipes = async () => {
    try {
        return await Recipe.find({});
    } catch (error) {
        throw new Error(`Error fetching recipes: ${error.message}`);
    }
};

/**
 * Get a recipe by its ID
 */
export const getRecipeById = async (recipeId) => {
    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            throw new Error("Recipe not found");
        }
        return recipe;
    } catch (error) {
        throw new Error(`Error fetching recipe with ID ${recipeId}: ${error.message}`);
    }
};

/**
 * Create a new recipe
 */
export const createRecipe = async (recipeData) => {
    try {
        const newRecipe = new Recipe(recipeData);
        return await newRecipe.save();
    } catch (error) {
        throw new Error(`Error creating recipe: ${error.message}`);
    }
};

/**
 * Update a recipe by its ID
 */
export const updateRecipe = async (recipeId, updateData) => {
    try {
        // Remove immutable fields from the updateData
        const { id, creator, creationTime, lastModifiedTime, ...allowedUpdates } = updateData;
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, allowedUpdates, { new: true });
        if (!updatedRecipe) {
            throw new Error("Recipe not found");
        }
        return updatedRecipe;
    } catch (error) {
        throw new Error(`Error updating recipe with ID ${recipeId}: ${error.message}`);
    }
};

/**
 * Delete a recipe by its ID
 */
export const deleteRecipe = async (recipeId) => {
    try {
        const result = await Recipe.findByIdAndDelete(recipeId);
        if (!result) {
            throw new Error("Recipe not found");
        }
    } catch (error) {
        throw new Error(`Error deleting recipe with ID ${recipeId}: ${error.message}`);
    }
};

/**
 * Verify that the user owns the recipe
 */
export async function verifyRecipeOwnership(recipeId, userId) {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new Error("Recipe not found");
    }
    if (recipe.author.toString() !== userId) {
        throw new Error("Forbidden: You do not own this recipe");
    }
    return recipe;
}