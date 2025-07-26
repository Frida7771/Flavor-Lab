import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";

type RecipeModalContentProps = {
  onSubmit: (data: {
    name: string;
    picture: string;
    steps: string[];
    ingredients: {
      name: string;
      amount: number;
      unit: string;
      allergy: string;
    }[];
  }) => void;
};

const RecipeModalContent: React.FC<RecipeModalContentProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [stepInput, setStepInput] = useState("");
  const [ingredients, setIngredients] = useState<
    { name: string; amount: number; unit: string; allergy: string }[]
  >([]);
  const [ingredientInput, setIngredientInput] = useState({
    name: "",
    amount: 0,
    unit: "",
    allergy: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleAddStep = () => {
    if (stepInput.trim()) {
      setSteps([...steps, stepInput]);
      setStepInput("");
    }
  };

  const handleAddIngredient = () => {
    const { name, amount, unit, allergy } = ingredientInput;
    if (name && amount > 0 && unit) {
      setIngredients([...ingredients, { name, amount, unit, allergy }]);
      setIngredientInput({ name: "", amount: 0, unit: "", allergy: "" });
    }
  };

  const handleSubmit = () => {
    if (!name || !steps.length || !ingredients.length) {
      setError("Please fill out all required fields.");
      return;
    }
    onSubmit({ name, picture, steps, ingredients });
    setName("");
    setPicture("");
    setSteps([]);
    setIngredients([]);
    setError(null);
  };

  return (
    <div className="recipe-modal-content">
      <Typography variant="h6" component="h2">
        Create New Recipe
      </Typography>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      <TextField
        fullWidth
        margin="normal"
        label="Recipe Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Picture URL"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Add Step"
        value={stepInput}
        onChange={(e) => setStepInput(e.target.value)}
      />
      <Button onClick={handleAddStep} variant="outlined" sx={{ mb: 2 }}>
        Add Step
      </Button>
      <Typography variant="body2">Steps:</Typography>
      <ul>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <TextField
        fullWidth
        margin="normal"
        label="Ingredient Name"
        value={ingredientInput.name}
        onChange={(e) =>
          setIngredientInput({ ...ingredientInput, name: e.target.value })
        }
      />
      <TextField
        fullWidth
        margin="normal"
        label="Amount"
        type="number"
        value={ingredientInput.amount}
        onChange={(e) =>
          setIngredientInput({
            ...ingredientInput,
            amount: parseFloat(e.target.value),
          })
        }
      />
      <TextField
        fullWidth
        margin="normal"
        label="Unit"
        value={ingredientInput.unit}
        onChange={(e) =>
          setIngredientInput({ ...ingredientInput, unit: e.target.value })
        }
      />
      <TextField
        fullWidth
        margin="normal"
        label="Allergy Information"
        value={ingredientInput.allergy}
        onChange={(e) =>
          setIngredientInput({ ...ingredientInput, allergy: e.target.value })
        }
      />
      <Button onClick={handleAddIngredient} variant="outlined" sx={{ mb: 2 }}>
        Add Ingredient
      </Button>
      <Typography variant="body2">Ingredients:</Typography>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - {ingredient.amount} {ingredient.unit} (Allergy:
            {ingredient.allergy || "None"})
          </li>
        ))}
      </ul>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit Recipe
      </Button>
    </div>
  );
};

export default RecipeModalContent;
