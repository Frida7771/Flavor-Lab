import { Recipe } from '../models/Recipe';

const port = '3002';

/**
 * Fetches a recipe by its ID.
 */
export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  console.log(`Fetching recipe with ID: ${id}`);
  const response = await fetch(`http://localhost:${port}/recipes/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipe data');
  }
  return response.json();
};

/**
 * Creates a new recipe.
 */
export const createRecipe = async (recipe: Recipe): Promise<void> => {
  console.log('Creating a new recipe:', recipe);
  const response = await fetch(`http://localhost:${port}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(recipe),
  });
  if (!response.ok) {
    throw new Error('Failed to create the recipe');
  }
  console.log('Recipe created successfully');
};

/**
 * Fetches all recipes.
 */
export const fetchRecipes = async (): Promise<Recipe[]> => {
  console.log('Fetching all recipes');
  const response = await fetch(`http://localhost:${port}/recipes`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return response.json();
};

/**
 * Updates an existing recipe.
 */
export const updateRecipe = async (recipe: Recipe): Promise<void> => {
  console.log('Updating recipe:', recipe);
  const response = await fetch(`http://localhost:${port}/recipes/${recipe.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(recipe),
  });
  if (!response.ok) {
    throw new Error('Failed to update the recipe');
  }
  console.log('Recipe updated successfully');
};

/**
 * Deletes a recipe by its ID.
 */
export const deleteRecipe = async (id: string): Promise<void> => {
  console.log(`Deleting recipe with ID: ${id}`);
  const response = await fetch(`http://localhost:${port}/recipes/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to delete recipe');
  }
  console.log('Recipe deleted successfully');
};