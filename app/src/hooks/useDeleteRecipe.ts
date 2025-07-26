import { useState } from 'react';
import { deleteRecipe } from '../services/recipeService';

export const useDeleteRecipe = () => {
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    setDeleteError(null);

    try {
      await deleteRecipe(id);
      return true; // Indicate success
    } catch (error: any) {
      setDeleteError(error?.message || 'Failed to delete recipe');
      return false; // Indicate failure
    } finally {
      setDeleting(false);
    }
  };

  return { handleDelete, deleting, deleteError };
};
