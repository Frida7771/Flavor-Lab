import mongoose from 'mongoose';
import Comment from "../models/comment.js";
import User from "../models/user-model.js"; // Import the User model to fetch the username
import Recipe from "../models/recipe.js";



/**
 * Get all comments for a specific recipe
 */
export const getCommentsByRecipeId = async (recipeId) => {
    try {
        return await Comment.find( {recipeId });
    } catch (error) {
        throw new Error(`Error fetching comments for recipe ID ${recipeId}: ${error.message}`);
    }
};


/**
 * Get all comments for a specific user and include the username
 */
export const getCommentsByUserId = async (userId) => {
    try {
        return await Comment.find( {userId});
    } catch (error) {
        throw new Error(`Error fetching comments for user ID ${userId}: ${error.message}`);
    }
};


/**
 * Add a comment to a specific recipe
 */
export const addCommentToRecipe = async (recipeId, commentData) => {
    try {
        // Fetch recipe details by recipeId
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            throw new Error(`Recipe with ID ${recipeId} not found`);
        }

        // Fetch user details by userId
        const user = await User.findById(commentData.userId); // Assuming userId is a reference to the User model
        if (!user) {
            throw new Error(`User with ID ${commentData.userId} not found`);
        }

        const username = user.userName; // Get the username (or creator's name) from the user document

        // Create a new comment
        const newComment = new Comment({
            recipeId,
            creator: username, // Use the fetched username as the creator
            userId: commentData.userId,
            content: commentData.content,
        });

        // Save and return the comment
        return await newComment.save();
    } catch (error) {
        throw new Error(`Error adding comment for recipe ID ${recipeId}: ${error.message}`);
    }
};



/**
 * Delete comment by a comment id
 */
export const deleteComment = async (commentId) => {
    console.log("Deleting comment with ID:", commentId);
    try {
        // Attempt to find and delete the comment by its _id
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            throw new Error("Comment not found");
        }
    } catch (error) {
        throw new Error(`Error deleting comment with ID ${commentId}: ${error.message}`);
    }
};


//add comment by userId
export const addCommentByUserId = async (userId, commentData) => {
    try {
        // Ensure userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error(`Invalid userId: ${userId}`);
        }

        // Fetch user details
        const user = await User.findById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }

        const username = user.userName; // Make sure userName is populated
        if (!username) {
            throw new Error("Username is missing for the fetched user");
        }

        // Create a new comment
        const newComment = new Comment({
            userId, // Include the userId for reference
            creator: username, // Use userName as the creator
            recipeId: commentData.recipeId,
            content: commentData.content,
        });

        // Save and return the comment
        return await newComment.save();
    } catch (error) {
        throw new Error(`Error adding comment for user ID ${userId}: ${error.message}`);
    }
};






