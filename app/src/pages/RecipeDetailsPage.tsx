import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import HeroImage from '../components/HeroImage';
import RecipeTitle from '../components/RecipeTitle';
import RecipeRatings from '../components/RecipeRatings';
import RecipeIngredients from '../components/RecipeIngredients';
import StepByStepGuide from '../components/StepByStepGuide';
import styles from '../styles/RecipeDetailsPage.module.css';
import SinglePageMenuAppBar from '../components/SinglePageNavBar';
import EditRecipe from '../components/EditRecipe';
import ShareButton from '../components/FuguWebShareButton';
import SocialMediaShare from '../components/SocialMediaShare';
import { useSelector } from 'react-redux';
import { RootState } from '../services/store';
import RecipeEditButtons from '../components/RecipeEditButtons';
import { useRecipe } from '../hooks/useRecipe';
import CommentSection from '../components/CommentSection';

const RecipeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const goToLastPage = () => {navigate(-1);};

  const { recipe, loading, error, refetch } = useRecipe(id!);
  const [isEditing, setIsEditing] = useState(false);

  const userid = useSelector((state: RootState) => state.auth.user?.userid);

  const handleDeleteSuccess = () => {goToLastPage();};

  // Set the document title to the recipe name
  useEffect(() => {
    if (recipe) {
      document.title = `Flavor Lab - ${recipe.name}`;
    } else {
      document.title = 'Flavor Lab';
    }
  }, [recipe]);

  // Set Recipe loading, error, and not found states
  if (loading) {return <p className={styles.message}>Loading...</p>;}
  if (error) {return <p className={styles.message}>{error}</p>;}
  if (!recipe) {return <p className={styles.message}>Recipe not found.</p>;}
  return (
    <>
      <Box
        sx={(theme) => ({
          marginTop: `${theme.mixins.toolbar.minHeight}px`,
          [theme.breakpoints.up('xs')]: {'@media (orientation: landscape)': {marginTop: `48px`,},},
          [theme.breakpoints.up('sm')]: {marginTop: `64px`,},
        })}
      >
        <SinglePageMenuAppBar pageName="Recipe" />
        <div className={`${styles.recipeDetails} ${isEditing ? styles.pushLeft : ''}`}>
          <HeroImage imageUrl={recipe.picture || ''} />
          <RecipeTitle title={recipe.name} />
          <RecipeRatings value={recipe.rating} />
          <div className={styles.shareContainer}>
            <SocialMediaShare title={document.title} />
            <ShareButton title={document.title} />
          </div>
          <RecipeIngredients ingredients={recipe.ingredients} />
          <StepByStepGuide steps={recipe.steps} />
          <CommentSection recipeId={id!} />
          <RecipeEditButtons
            userid={userid}
            recipeCreator={recipe.creator}
            setIsEditing={setIsEditing}
            recipeId={id!}
            onDeleteSuccess={handleDeleteSuccess}
            buttonContainerClassName={styles.buttonContainer}
          />
        </div>
        {isEditing && (
          <EditRecipe
            recipe={recipe}
            onClose={() => setIsEditing(false)}
            onUpdateSuccess={() => {
              setIsEditing(false);
              refetch();
            }}
          />
        )}
      </Box>
    </>
  );
};

export default RecipeDetailsPage;
