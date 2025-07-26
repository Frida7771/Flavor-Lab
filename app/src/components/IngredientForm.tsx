import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { Ingredient } from '../models/Ingredient';

interface IngredientFormProps {
  onSubmit: (ingredient: Partial<Ingredient>) => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ onSubmit }) => {
  const [ingredientName, setIngredientName] = useState('');

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (ingredientName.trim()) {
      onSubmit({ name: ingredientName });
      setIngredientName(''); 
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientName(event.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={10}>
          <TextField
            label="Ingredient Name"
            variant="outlined"
            fullWidth
            size="medium"
            value={ingredientName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ height: '100%' }}
          >
            Add Ingredient
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default IngredientForm;
