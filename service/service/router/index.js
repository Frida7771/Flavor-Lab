import recipeRouter from "./recipe-router.js";
import userRouter from "./user-router.js";
import authRouter from "./auth-router.js";
import ingredientRoutes from './ingredient-router.js';
import allergenRoutes from './allergen-router.js';
import commentRoutes from './comment-router.js';


const initializeRoutes = (app) => {
    app.use('/recipes', recipeRouter);
    // User 
    app.use("/user", userRouter);

    // Auth
    app.use("/", authRouter)

    // Ingredients
    app.use('/api/ingredients', ingredientRoutes);

    // Allergen
    app.use('/api/allergens', allergenRoutes);

    // Comments
    app.use('/comment', commentRoutes);
};

export default initializeRoutes;