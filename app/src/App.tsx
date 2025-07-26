import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginWithUsernameAndPassword from './pages/login-page'
import Home from './pages/Home'
import RecipeDetailsPage from './pages/RecipeDetailsPage'
import CommentPage from './pages/CommentPage'
import IngredientPage from './pages/IngredientPage'
import UserPage from './pages/UserPage'
import SignUpPage from './pages/SignUpPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './services/authSlice';
import { getUserIdFromCookie, getUserNameFromCookie } from './services/userService';

const CLIENT_ID = '616961216166-qiirac4k0amtnjl71hp8otgqgohk1uak.apps.googleusercontent.com'; // client id for google login
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const userId = getUserIdFromCookie();
      const userName = getUserNameFromCookie();

      if (userId && userName) {
        dispatch(login({ username: userName, userid: userId, password: "" }));
      } else {
        console.log("User data is incomplete or unavailable in cookies.");
      }
    } catch (error) {
      console.error("Error fetching user data from cookies:", error);
    }
  }, [dispatch]);
  return (
    // google login 
    <GoogleOAuthProvider clientId={CLIENT_ID}> 
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<LoginWithUsernameAndPassword />}></Route>
            <Route path="/home/guest" element={<Home isGuest={true} />}></Route>
            <Route path="/home" element={<Home isGuest={false} />}></Route>
            <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
            <Route path="/comment" element={<CommentPage />}></Route>
            <Route path="/ingredient" element={<IngredientPage />}></Route>
            <Route path="/userprofile/:id" element={<UserPage />}></Route>
            <Route path="/user" element={<SignUpPage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
