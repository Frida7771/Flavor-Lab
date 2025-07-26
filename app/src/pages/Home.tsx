import React, { useEffect, useState } from 'react';
import NavBar from '../components/HomePageNavBar';
import FloatingButton from '../components/FloatingButton';
import RecipeModal from '../components/RecipeModal';
import RecipeBoard from '../components/RecipeBoard';
import { useRecipeSubmitHandler } from '../hooks/useRecipeSubmitHandler';
import { isSignIn } from '../services/userService';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../services/store';
import { useAllRecipes } from '../hooks/useAllRecipe';
import { Box } from '@mui/material';
import { Recipe } from '../models/Recipe'; // Import Recipe type

const Home: React.FC<{ isGuest: boolean }> = ({ isGuest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]); // Explicitly define the state type as Recipe[]
  const { recipes, refreshRecipes, loading: recipesLoading, error: recipesError } = useAllRecipes();
  const { handleRecipeSubmit, loading, error } = useRecipeSubmitHandler(() => {
    refreshRecipes();
    setIsModalOpen(false);
  });
  const navigate = useNavigate();
  const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    setFilteredRecipes(recipes); // This is fine because recipes is already typed as Recipe[]
  }, [recipes]);

  const handleSearch = (searchTerm: string) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredRecipes(filtered);
  };

  if (!isSignIn() && !isGuest) {
    useEffect(() => {
      navigate('/');
    }, [navigate]);
    return null;
  }

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Box
        sx={(theme) => ({
          marginTop: `${theme.mixins.toolbar.minHeight}px`,
          [theme.breakpoints.up('xs')]: {
            '@media (orientation: landscape)': {
              marginTop: `48px`,
            },
          },
          [theme.breakpoints.up('sm')]: {
            marginTop: `64px`,
          },
        })}
      >
        <NavBar isGuest={isGuest} onSearch={handleSearch} />
        {authenticated && <FloatingButton onClick={handleOpenModal} />}
        <RecipeBoard recipes={filteredRecipes} />
        <RecipeModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleRecipeSubmit}
        />
        {(loading || recipesLoading) && <div>Loading...</div>}
        {(error || recipesError) && <div style={{ color: 'red' }}>{error}</div>}
      </Box>
    </>
  );
};

export default Home;