import React, { useState } from 'react';
import { Button } from '@mui/material';
import DeleteConfirmation from './RecipeDetailsDeleteConfirmation'; 
import { useDeleteRecipe } from '../hooks/useDeleteRecipe';

interface DeleteRecipeProps {
  recipeId: string;
  onDeleteSuccess?: () => void;
}

const DeleteRecipe: React.FC<DeleteRecipeProps> = ({ recipeId, onDeleteSuccess }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { handleDelete, deleting, deleteError } = useDeleteRecipe();

  const onConfirmDelete = async () => {
    const success = await handleDelete(recipeId);
    if (success) {
      setDeleteDialogOpen(false);
      onDeleteSuccess && onDeleteSuccess();
    } else {
      alert(deleteError || 'Failed to delete recipe');
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        sx={{ width: '48%' }}
        onClick={() => setDeleteDialogOpen(true)}
        disabled={deleting}
      >
        {deleting ? 'Deleting...' : 'Delete Recipe'}
      </Button>
      <DeleteConfirmation
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={onConfirmDelete}
      />
    </>
  );
};

export default DeleteRecipe;
