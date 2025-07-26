import { Allergen } from '../models/Allergen';

const BASE_URL = 'http://localhost:3002/api';

// Fetch allergens for a specific ingredient
export const fetchAllergensForIngredient = async (ingredientId: string): Promise<Allergen[]> => {
  console.log(`Fetching allergens for ingredient ID: ${ingredientId}`);
  const response = await fetch(`${BASE_URL}/ingredients/${ingredientId}/allergies`);

  if (!response.ok) {
    console.error(`Failed to fetch allergens for ingredient ID: ${ingredientId}`);
    throw new Error('Failed to fetch allergens for ingredient');
  }

  const allergens = await response.json();
  console.log(`Fetched allergens for ingredient ID ${ingredientId}:`, allergens);
  return allergens;
};

// Fetch all allergens
export const fetchAllAllergens = async (): Promise<Allergen[]> => {
  console.log('Fetching all allergens...');
  const response = await fetch(`${BASE_URL}/allergens`);

  if (!response.ok) {
    console.error('Failed to fetch all allergens');
    throw new Error('Failed to fetch all allergens');
  }

  const allergens = await response.json();
  console.log('Fetched all allergens:', allergens);
  return allergens;
};

// Add an allergen to a specific ingredient
export const addAllergenToIngredient = async (
  ingredientId: string,
  allergenName: string
): Promise<Allergen> => {
  console.log('Adding allergen to ingredient:', { ingredientId, allergenName });

  const response = await fetch(`${BASE_URL}/ingredients/${ingredientId}/allergies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ allergen: allergenName }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error adding allergen:', errorText);
    throw new Error(errorText || 'Failed to add allergen to ingredient');
  }

  const newAllergen = await response.json();
  console.log('Allergen added successfully:', newAllergen);
  return newAllergen;
};

// Delete an allergen from a specific ingredient
export const deleteAllergenFromIngredient = async (
  ingredientId: string,
  allergenId: string
): Promise<void> => {
  console.log(`Deleting allergen ID ${allergenId} from ingredient ID ${ingredientId}`);
  
  const response = await fetch(`${BASE_URL}/ingredients/${ingredientId}/allergies/${allergenId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    console.error(
      `Failed to delete allergen ID ${allergenId} from ingredient ID ${ingredientId}`
    );
    throw new Error('Failed to delete allergen from ingredient');
  }

  console.log(`Allergen ID ${allergenId} deleted successfully from ingredient ID ${ingredientId}`);
};
