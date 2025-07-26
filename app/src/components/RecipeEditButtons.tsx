import React from 'react';
import { Button } from '@mui/material';
import DeleteRecipe from './DeleteRecipe';

interface RecipeEditButtonsProps {
  userid?: string;
  recipeCreator?: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  recipeId: string;
  onDeleteSuccess?: () => void;
  buttonContainerClassName?: string;
}

const RecipeEditButtons: React.FC<RecipeEditButtonsProps> = ({
  userid,
  recipeCreator,
  setIsEditing,
  recipeId,
  onDeleteSuccess,
  buttonContainerClassName
}) => {
  // Only render if the logged-in user is the creator of the recipe
  if (userid !== recipeCreator) return null;

  return (
    <div className={buttonContainerClassName}>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: '48%' }}
        onClick={() => setIsEditing(true)}
      >
        Edit Recipe
      </Button>
      <DeleteRecipe recipeId={recipeId} onDeleteSuccess={onDeleteSuccess} />
    </div>
  );
};

export default RecipeEditButtons;
