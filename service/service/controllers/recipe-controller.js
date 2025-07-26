import * as recipeService from '../services/recipe-service.js';
import { successResponse, errorResponse } from './response-handler.js';
import { authenticateUser } from "../middleware/auth-middleware.js";


/**
 * Retrieve all recipes
 */
export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await recipeService.getAllRecipes();
        // Transform '_id' to 'id' for each recipe
        const response = recipes.map(recipe => ({
            ...recipe._doc,
            id: recipe._id,
            _id: undefined
        }));
        successResponse(res, 200, response);
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
};

/**
 * Retrieve a recipe by ID
 */
export const getRecipeById = async (req, res) => {
    const { recipeId } = req.params;
    try {
        const recipe = await recipeService.getRecipeById(recipeId);
        // Transform '_id' to 'id'
        const response = {
            ...recipe._doc,
            id: recipe._id,
            _id: undefined
        };
        successResponse(res, 200, response);
    } catch (error) {
        errorResponse(res, error.message.includes('not found') ? 404 : 500, error.message);
    }
};

/**
 * Create a new recipe
 */
export const createRecipe = async (req, res) => {
    try {
        const recipe = await recipeService.createRecipe(req.body);
        // Transform '_id' to 'id'
        const response = {
            ...recipe._doc,
            id: recipe._id,
            _id: undefined
        };
        successResponse(res, 201, response);
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
};

/**
 * Update a recipe by ID
 */
export const updateRecipe = [
    authenticateUser,
    async (req, res) => {
        const { recipeId } = req.params;
        const userId = req.user.userId;
        try {
            const recipe = await recipeService.updateRecipe(recipeId, req.body);

            if (recipe.creator !== userId) {
                return res.status(403).json({ message: "Forbidden" });
            }

            // Transform '_id' to 'id'
            const response = {
                ...recipe._doc,
                id: recipe._id,
                _id: undefined
            };
            successResponse(res, 200, response);
        } catch (error) {
            errorResponse(res, error.message.includes('not found') ? 404 : 500, error.message);
        }
    }
];

/**
 * Delete a recipe by ID
 */
export const deleteRecipe = [
    authenticateUser,
    async (req, res) => {
        const { recipeId } = req.params;
        const userId = req.user.userId;
        try {
            const recipe = await recipeService.getRecipeById(recipeId);

            if (recipe.creator !== userId) {
                return res.status(403).json({ message: "Forbidden" });
            }

            await recipeService.deleteRecipe(recipeId);
            successResponse(res, 204, null);
        } catch (error) {
            errorResponse(res, error.message.includes('not found') ? 404 : 500, error.message);
        }
    }
];
