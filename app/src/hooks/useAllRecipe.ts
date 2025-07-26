import { useState, useEffect } from 'react';
import { fetchRecipes } from '../services/recipeService';
import { Recipe } from '../models/Recipe';

export const useAllRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshRecipes = async () => {
    setLoading(true);
    try {
      const data = await fetchRecipes();
      setRecipes(data);
      setError(null); 
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshRecipes(); 
  }, []);

  return { recipes, refreshRecipes, loading, error };
};
