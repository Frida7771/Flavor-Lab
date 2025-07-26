import React from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/RecipeBoard.module.css';
import RecipeCard from './RecipeCard';
import { Recipe } from '../models/Recipe';

interface RecipeBoardProps {
  recipes: Recipe[];
}

const RecipeBoard: React.FC<RecipeBoardProps> = ({ recipes }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} className={styles.grid}>
      {recipes.map((recipe) => (
        <Grid item key={recipe.id} xs={12} sm={6}  md={4}  lg={3}  xl={2}>
          <RecipeCard
            name={recipe.name}
            picture={recipe.picture}
            rating={recipe.rating}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeBoard;