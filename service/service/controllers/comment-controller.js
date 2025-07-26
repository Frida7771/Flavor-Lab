import * as commentService from "../services/comment-service.js";
import { successResponse, errorResponse } from "./response-handler.js";

/**
 * Retrieve all comments for a specific recipe
 */
export const getCommentsByRecipeId = async (req, res) => {
    const { recipeId } = req.params;
    try {
        const comments = await commentService.getCommentsByRecipeId(recipeId);

        // Format comments if necessary
        const response = comments.map((comment) => ({
            ...comment._doc,
        }));

        successResponse(res, 200, response);
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
};


/**
 * Retrieve all comments for a specific user
 */
export const getCommentsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const comments = await commentService.getCommentsByUserId(userId);

        // Format comments if necessary
        const response = comments.map((comment) => ({
            ...comment._doc,
        }));

        successResponse(res, 200, response);
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
};




/**
 * Add a comment to a specific recipe
 */
export const addCommentToRecipe = async (req, res) => {
    const { recipeId } = req.params;
    console.log("Received recipeId:", recipeId);  // Log the incoming recipeId
    const { userId, content } = req.body;

    try {
        const newComment = await commentService.addCommentToRecipe(recipeId, { userId, content });

        const response = {
            recipeId: newComment.recipeId,
            userId: newComment.userId,
            creator: newComment.creator,
            content: newComment.content,
            creationTime: newComment.creationTime,
        };

        successResponse(res, 201, response);
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
};

/**
 * Delete a specific comment
 */
export const deleteComment = async (req, res) => {
    const { commentId } = req.params
    try {
        await commentService.deleteComment(commentId);
        successResponse(res, 204, null);
    } catch (error) {
        errorResponse(res, error.message.includes('not found') ? 404 : 500, error.message);
    }
};


/**
 * Add a comment for a specific user
 */
export const addCommentByUserId = async (req, res) => {
    const { userId } = req.params; // Extract userId from URL parameters
    const { recipeId, content } = req.body; // Extract necessary fields from request body

    try {
        // Call the service function to add the comment
        const newComment = await commentService.addCommentByUserId(userId, { recipeId, content });

        // Format the response to include userId
        const response = {
            userId: newComment.userId, // Include the userId
            recipeId: newComment.recipeId,
            creator: newComment.creator,
            content: newComment.content,
            creationTime: newComment.creationTime,
        };

        successResponse(res, 201, response);
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
};






