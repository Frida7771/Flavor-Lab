import { useCreateRecipe } from "../hooks/useCreateRecipe";
import { Recipe } from "../models/Recipe";
import { getUserIdFromCookie } from "../services/userService";
import { useEffect,useState } from "react";

export const useRecipeSubmitHandler = (onSuccess: () => void) => {
  const { createRecipe, loading, error } = useCreateRecipe();
  const [id, setId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false); 

  useEffect(() => {
    const userId = getUserIdFromCookie();
    if (!userId) {
      if (isInitialized) console.error("Failed to retrieve user ID from cookie.");
    } else {
      console.log("User ID retrieved:", userId);
      setId(userId);
    }
    setIsInitialized(true);
  }, []); 


  const handleRecipeSubmit = async (data: {
    name: string;
    picture: string;
    steps: string[];
    ingredients: {
      name: string;
      amount: number;
      unit: string;
      allergy: string;
    }[];
  }) => {
    if (!id) {
      console.error("User ID is null. Cannot create recipe.");
      return;
    }
    
    const recipe: Recipe = {
      id: Math.random().toString(36).substring(2, 11),
      name: data.name,
      creator: id, 
      steps: data.steps,
      picture: data.picture,
      ingredients: data.ingredients.map((ingredient, index) => ({
        id: index.toString(),
        ...ingredient,
        creator: id,
      })),
    };

    await createRecipe(recipe);

    if (!error) {
      console.log("Recipe successfully created");
      onSuccess();
    } else {
      console.error("Failed to create recipe:", error);
    }
  };

  return { handleRecipeSubmit, loading, error };
};
