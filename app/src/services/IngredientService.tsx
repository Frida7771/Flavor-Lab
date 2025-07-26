import { Ingredient } from '../models/Ingredient';

const BASE_URL = 'http://localhost:3002/api/ingredients';

// Fetch all ingredients
export const fetchIngredients = async (): Promise<Ingredient[]> => {
  console.log('Fetching ingredients...');
  const response = await fetch(BASE_URL);
  
  if (!response.ok) {
    console.error('Failed to fetch ingredients');
    throw new Error('Failed to fetch ingredients');
  }

  const data = await response.json();
  console.log('Ingredients fetched successfully:', data);

  return data.map((ingredient: any) => ({
    ...ingredient,
    id: ingredient._id, // Map `_id` to `id`
  }));
};

// Add a new ingredient
export const addIngredient = async (ingredient: { name: string }): Promise<Ingredient> => {
  console.log('Adding ingredient:', ingredient);
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ingredient),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error('Error adding ingredient:', errorDetails);
    throw new Error(errorDetails.error || 'Failed to add ingredient');
  }

  const newIngredient = await response.json();
  console.log('Ingredient added successfully:', newIngredient);
  return newIngredient;
};

// Delete an ingredient by ID
export const deleteIngredient = async (id: string): Promise<void> => {
  console.log(`Deleting ingredient with ID: ${id}`);
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    console.error(`Failed to delete ingredient with ID: ${id}`);
    throw new Error(`Failed to delete ingredient with ID: ${id}`);
  }

  console.log(`Ingredient with ID ${id} deleted successfully`);
};

// Update an ingredient by ID
export const updateIngredient = async (id: string, data: Partial<Ingredient>): Promise<Ingredient> => {
  console.log(`Updating ingredient with ID: ${id}`, data);
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error(`Failed to update ingredient with ID: ${id}`);
    throw new Error('Failed to update ingredient');
  }

  const updatedIngredient = await response.json();
  console.log(`Ingredient with ID ${id} updated successfully:`, updatedIngredient);
  return updatedIngredient;
};
