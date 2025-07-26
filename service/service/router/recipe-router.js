import express from "express";
import * as recipeController from "../controllers/recipe-controller.js";

const router = express.Router();

// Route to retrieve all recipes
router.get("/", recipeController.getAllRecipes);

// Route to retrieve a recipe by ID
router.get("/:recipeId", recipeController.getRecipeById);

// Route to create a new recipe
router.post("/", recipeController.createRecipe);

// Route to update a recipe by ID
router.put("/:recipeId", recipeController.updateRecipe);

// Route to delete a recipe by ID
router.delete("/:recipeId", recipeController.deleteRecipe);

export default router;