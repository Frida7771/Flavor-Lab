import React from 'react';
import { Ingredient } from '../models/Ingredient';
import styles from '../styles/components/RecipeIngredients.module.css';

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({ ingredients }) => {
  return (
    <div className={styles.ingredientsContainer}>
      <h2 className={styles.heading}>Ingredients</h2>
      <ul className={styles.ingredientsList}>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id} className={styles.ingredientItem}>
            <span className={styles.name}>{ingredient.name}</span>
            <span className={styles.dots}></span>
            {ingredient.amount && (
              <span className={styles.amount}>
                {ingredient.amount} {ingredient.unit}
              </span>
            )}
            {ingredient.allergy && ingredient.allergy !== "None" && (
              <span className={styles.allergy}>({ingredient.allergy})</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeIngredients;
