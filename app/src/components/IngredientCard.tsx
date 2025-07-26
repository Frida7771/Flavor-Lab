import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { Ingredient } from '../models/Ingredient';

interface IngredientCardProps {
  ingredient: Ingredient;
  onDelete: (id: string) => void;
  onUpdate: (updatedIngredient: Ingredient) => void;
  onSelect: () => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onDelete, onSelect }) => {
  const handleDelete = () => {
    console.log(`Delete button clicked for ID: ${ingredient.id}`);
    console.log('Ingredient details:', ingredient);
    onDelete(ingredient.id);
  };

  const handleSelect = () => {
    onSelect();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{ingredient.name}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={handleDelete}>
          DELETE
        </Button>
        <Button color="primary" onClick={handleSelect}>
          SELECT
        </Button>
      </CardActions>
    </Card>
  );
};

export default IngredientCard;
