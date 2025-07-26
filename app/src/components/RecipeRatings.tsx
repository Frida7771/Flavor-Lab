import React from 'react';
import { Rating } from '@mui/material';
import styles from '../styles/components/RecipeRatings.module.css';

interface RecipeRatingsProps {
  value: number|undefined;
}

const RecipeRatings: React.FC<RecipeRatingsProps> = ({ value }) => (
  <div className={styles.ratings}>
    <Rating value={value} readOnly />
  </div>
);

export default RecipeRatings;
