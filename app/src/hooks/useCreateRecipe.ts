import { useState } from 'react';
import { Recipe } from '../models/Recipe';
import { createRecipe } from '../services/recipeService';

/**
 * Custom hook for creating a recipe.
 */
export const useCreateRecipe = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateRecipe = async (recipe: Recipe) => {
    try {
      setLoading(true);
      setError(null);
      await createRecipe(recipe);
    } catch (err) {
      setError('Failed to create the recipe.');
    } finally {
      setLoading(false);
    }
  };

  return { createRecipe: handleCreateRecipe, loading, error };
};
