import React, { useState } from 'react';
import { TextField, Button, Typography, IconButton, Box, Grid, Divider } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import styles from '../styles/components/EditRecipe.module.css';
import { updateRecipe } from '../services/recipeService';
import { Recipe } from '../models/Recipe';
import { Ingredient } from '../models/Ingredient';
import { isSignIn } from "../services/userService";

interface EditRecipeProps {
  recipe: Recipe;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

const EditRecipe: React.FC<EditRecipeProps> = ({ recipe, onClose, onUpdateSuccess }) => {
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);

  const handleChange = (field: keyof Recipe, value: any) => {
    setUpdatedRecipe((prev) => ({ ...prev, [field]: value }));
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: any) => {
    const ingredients = [...updatedRecipe.ingredients];
    ingredients[index] = { ...ingredients[index], [field]: value };
    setUpdatedRecipe((prev) => ({ ...prev, ingredients }));
  };

  const handleStepChange = (index: number, value: string) => {
    const steps = [...updatedRecipe.steps];
    steps[index] = value;
    setUpdatedRecipe((prev) => ({ ...prev, steps }));
  };

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: `${Date.now()}`,
      name: '',
      amount: 0,
      unit: '',
      creator: '',
      allergy: 'None',
    };
    setUpdatedRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient],
    }));
  };

  const removeIngredient = (index: number) => {
    const ingredients = [...updatedRecipe.ingredients];
    ingredients.splice(index, 1);
    setUpdatedRecipe((prev) => ({ ...prev, ingredients }));
  };

  const addStep = () => {
    setUpdatedRecipe((prev) => ({
      ...prev,
      steps: [...prev.steps, ''],
    }));
  };

  const removeStep = (index: number) => {
    const steps = [...updatedRecipe.steps];
    steps.splice(index, 1);
    setUpdatedRecipe((prev) => ({ ...prev, steps }));
  };

  const handleUpdate = async () => {
    try {
      await updateRecipe(updatedRecipe);
      onUpdateSuccess();
      onClose();
    } catch (error) {
      alert('Failed to update recipe');
    }
  };

  return (
    <Box className={styles.editRecipe}>
      <Typography variant="h5" gutterBottom>
        Edit Recipe
      </Typography>
      <TextField
        label="Name"
        fullWidth
        value={updatedRecipe.name}
        onChange={(e) => handleChange('name', e.target.value)}
        margin="normal"
      />
      <TextField
        label="Rating"
        type="number"
        fullWidth
        value={updatedRecipe.rating}
        onChange={(e) => handleChange('rating', Number(e.target.value))}
        margin="normal"
      />
      <TextField
        label="Image URL"
        fullWidth
        value={updatedRecipe.picture || ''}
        onChange={(e) => handleChange('picture', e.target.value)}
        margin="normal"
      />

      <Divider sx={{ my: 2 }}>Ingredients</Divider>
      {updatedRecipe.ingredients.map((ingredient, index) => (
        <Grid container spacing={2} key={ingredient.id} alignItems="center" className={styles.ingredient}>
          <Grid item xs={4}>
            <TextField
              label="Name"
              fullWidth
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              value={ingredient.amount}
              onChange={(e) => handleIngredientChange(index, 'amount', Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Unit"
              fullWidth
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton color="error" onClick={() => removeIngredient(index)}>
              <RemoveCircle />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        variant="outlined"
        startIcon={<AddCircle />}
        onClick={addIngredient}
        sx={{ mt: 1 }}
      >
        Add Ingredient
      </Button>

      <Divider sx={{ my: 2 }}>Steps</Divider>
      {updatedRecipe.steps.map((step, index) => (
        <Grid container spacing={2} key={index} alignItems="center" className={styles.step}>
          <Grid item xs={10}>
            <TextField
              label={`Step ${index + 1}`}
              fullWidth
              multiline
              maxRows={4}
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              InputProps={{
                style: { maxHeight: '100px', overflow: 'auto' },
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton color="error" onClick={() => removeStep(index)}>
              <RemoveCircle />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        variant="outlined"
        startIcon={<AddCircle />}
        onClick={addStep}
        sx={{ mt: 1 }}
      >
        Add Step
      </Button>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditRecipe;
