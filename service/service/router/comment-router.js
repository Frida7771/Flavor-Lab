import express from "express";
import * as commentController from "../controllers/comment-controller.js";

const router = express.Router();

// Route to retrieve all comments for a specific recipe
router.get("/recipe/:recipeId", commentController.getCommentsByRecipeId);

// Route to retrieve all comments for a specific user
router.get("/user/:userId", commentController.getCommentsByUserId);

// Route to add a new comment to a specific recipe
router.post("/:recipeId", commentController.addCommentToRecipe);

// Route to delete a specific comment
router.delete("/:commentId", commentController.deleteComment);

// Route to add a new comment for a specific user
router.post("/user/:userId", commentController.addCommentByUserId);





export default router;
