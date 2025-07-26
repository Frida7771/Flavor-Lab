import React from 'react';
import styles from '../styles//components/RecipeTitle.module.css';

interface RecipeTitleProps {
  title: string;
}

const RecipeTitle: React.FC<RecipeTitleProps> = ({ title }) => (
  <h1 className={styles.recipeTitle}>{title}</h1>
);

export default RecipeTitle;
