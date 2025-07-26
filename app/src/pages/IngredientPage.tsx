import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import IngredientCard from '../components/IngredientCard';
import IngredientForm from '../components/IngredientForm';
import AllergenList from '../components/AllergenList';
import AllergenSelector from '../components/AllergenSelector';
import {
  fetchIngredients,
  addIngredient,
  deleteIngredient,
  updateIngredient,
} from '../services/IngredientService';
import {
  fetchAllergensForIngredient,
  addAllergenToIngredient,
  deleteAllergenFromIngredient,
  fetchAllAllergens,
} from '../services/allergenService';
import { Ingredient } from '../models/Ingredient';
import { Allergen } from '../models/Allergen';
import SinglePageMenuAppBar from '../components/SinglePageNavBar';

const IngredientPage: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [allergens, setAllergens] = useState<Allergen[]>([]);
  const [allAllergens, setAllAllergens] = useState<Allergen[]>([]);

  // Load ingredients and allergens
  useEffect(() => {
    const loadData = async () => {
      try {
        const ingredientData = await fetchIngredients();
        const allergenData = await fetchAllAllergens();
        setIngredients(ingredientData);
        setAllAllergens(allergenData);
        console.log('Loaded ingredients and allergens');
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, []);

  // Load allergens for the selected ingredient
  useEffect(() => {
    if (!selectedIngredient) {
      setAllergens([]);
      return;
    }

    const loadAllergens = async () => {
      try {
        const allergenData = await fetchAllergensForIngredient(selectedIngredient.id);
        setAllergens(allergenData);
        console.log(`Loaded allergens for ingredient ID: ${selectedIngredient.id}`);
      } catch (error) {
        console.error('Failed to load allergens:', error);
      }
    };
    loadAllergens();
  }, [selectedIngredient]);

  // Add ingredient
  const handleAdd = async (ingredient: Partial<Ingredient>) => {
    if (!ingredient.name?.trim()) {
      alert('Ingredient name is required');
      return;
    }

    try {
      //const newIngredient = await addIngredient(ingredient);
      const newIngredient = await addIngredient({
        name: ingredient.name ?? "Patato", 
      });
      setIngredients((prev) => [...prev, newIngredient]);
      console.log('Added ingredient:', newIngredient);
    } catch (error) {
      console.error('Failed to add ingredient:', error);
      alert('Failed to add ingredient. Please try again.');
    }
  };

  // Delete ingredient
  const handleDelete = async (id: string) => {
    try {
      await deleteIngredient(id);
      setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
      console.log(`Deleted ingredient with ID: ${id}`);
    } catch (error) {
      console.error(`Failed to delete ingredient with ID: ${id}`, error);
      alert('Failed to delete ingredient.');
    }
  };

  // Update ingredient
  const handleUpdate = async (updatedIngredient: Ingredient) => {
    try {
      const updated = await updateIngredient(updatedIngredient.id, updatedIngredient);
      setIngredients((prev) =>
        prev.map((ingredient) => (ingredient.id === updated.id ? updated : ingredient))
      );
      console.log('Updated ingredient:', updated);
    } catch (error) {
      console.error('Failed to update ingredient:', error);
    }
  };

  // Add allergen
  const handleAddAllergen = async (allergenName: string) => {
    if (!selectedIngredient || !allergenName.trim()) {
      console.error('Invalid data for adding allergen');
      return;
    }

    try {
      const newAllergen = await addAllergenToIngredient(selectedIngredient.id, allergenName.trim());
      setAllergens((prev) => [...prev, newAllergen]);
      console.log('Added allergen:', newAllergen);
    } catch (error) {
      console.error('Failed to add allergen:', error);
    }
  };

  // Delete allergen
  const handleDeleteAllergen = async (allergenId: string) => {
    if (!selectedIngredient) return;

    try {
      await deleteAllergenFromIngredient(selectedIngredient.id, allergenId);
      setAllergens((prev) => prev.filter((allergen) => allergen.id !== allergenId));
      console.log(`Deleted allergen with ID: ${allergenId}`);
    } catch (error) {
      console.error('Failed to delete allergen:', error);
    }
  };

  return (
    <Box sx={{ marginTop: { xs: '48px', sm: '64px' } }}>
      <SinglePageMenuAppBar pageName="Ingredient" />
      <Container sx={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Ingredients Manager
        </Typography>
        <IngredientForm onSubmit={handleAdd} />
        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          {ingredients.map((ingredient) => (
            <Grid item xs={12} sm={6} md={4} key={ingredient.id}>
              <IngredientCard
                ingredient={ingredient}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                onSelect={() => setSelectedIngredient(ingredient)}
              />
            </Grid>
          ))}
        </Grid>
        {selectedIngredient && (
          <Paper sx={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5">
              Allergens for {selectedIngredient.name}
            </Typography>
            <AllergenList allergens={allergens} onDelete={handleDeleteAllergen} />
            <AllergenSelector allergens={allAllergens} onAdd={handleAddAllergen} />
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default IngredientPage;
