import React from 'react';
import { Card, CardMedia, CardContent, Typography, Rating } from '@mui/material';
import styles from "../styles/components/RecipeCard.module.css";

interface RecipeCardProps {
    name: string;
    picture?: string;
    rating?: number;
    onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ name, picture, rating, onClick }) => {
    return (
        <Card className={styles.card} onClick={onClick} style={{ cursor: 'pointer' }}>
            {picture && (
                <CardMedia
                    component="img"
                    height="200"
                    image={picture}
                    alt={name}
                    className={styles.image}
                />
            )}
            <CardContent className={styles.cardContent}>
                <Typography variant="h6" className={styles.title}>
                    {name}
                </Typography>
                {rating !== undefined && (
                    <Rating value={rating} readOnly className={styles.centeredRating} />
                )}
            </CardContent>
        </Card>
    );
};

export default RecipeCard;
