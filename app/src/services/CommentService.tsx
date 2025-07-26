import { Comment } from '../models/comment';

const port = '3002'; // Ensure the backend is running on this port

/**
 * get all comments for a given recipe.
 */
export const getCommentsByRecipeId = async (recipeId: string): Promise<Comment[]> => {
  console.log(`Fetching comments for recipe with ID: ${recipeId}`);
  const response = await fetch(`http://localhost:${port}/comment/recipe/${recipeId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

/**
 * Fetches all comments by a given user.
 */
export const getCommentsByUserId = async (userId: string): Promise<Comment[]> => {
  const response = await fetch(`http://localhost:${port}/comment/user/${userId}`);

  if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.statusText}`);
  }
  return response.json();
};

/**
 * Adds a new comment to a recipe.
 */
export const addComment = async (recipeId: string, content: string, userId: string): Promise<Comment> => {
  const newComment = {
    recipeId,
    content,
    userId,  
  };

  const response = await fetch(`http://localhost:${port}/comment/${recipeId}`, {  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  });

  if (!response.ok) {
    const errorMessage = await response.text(); // Get server error details
    console.error('Server error:', errorMessage);
    throw new Error('Failed to add comment');
  }

  return response.json(); // Ensure this returns the Comment object
};

/**
 * Deletes a comment by its ID.
 */
export const deleteComment = async (commentId: string) => {
  const response = await fetch(`http://localhost:${port}/comment/${commentId}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      // Log the response body to inspect the error
      const errorResponse = await response.json();
      console.error('Delete comment error response:', errorResponse);
      throw new Error(errorResponse.message || 'Failed to delete comment');
  }

  // Log the success response
  console.log('Delete comment success');
};


