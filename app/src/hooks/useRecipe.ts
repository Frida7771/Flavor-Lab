import { useState, useEffect, useCallback } from 'react';
import { Recipe } from '../models/Recipe';
import { fetchRecipeById } from '../services/recipeService';

/**
 * Custom hook to fetch a recipe by its ID.
 */
export const useRecipe = (id: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedRecipe = await fetchRecipeById(id);
      setRecipe(fetchedRecipe);
      setError(null);
    } catch {
      setError('Failed to fetch the recipe data.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { recipe, loading, error, refetch: fetchData };
};
