import React, { useState, useEffect } from 'react';
import { addComment } from '../services/CommentService';
import { Comment } from '../models/comment';
import { getCommentsByRecipeId } from '../services/CommentService';

const RecipeComments: React.FC<{ recipeId: string }> = ({ recipeId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState<string>(''); // Declare 'content' state
  const [error, setError] = useState<string | null>(null);

  // Load existing comments
  const loadComments = async () => {
    try {
      const data = await getCommentsByRecipeId(recipeId);
      setComments(data);
    } catch {
      setError('Failed to fetch comments.');
    }
  };

  useEffect(() => {
    loadComments();
  }, [recipeId]);

  const handleAddComment = async () => {
    if (!content.trim()) {
      setError('Content cannot be empty');
      return;
    }

    try {
      // Pass both recipeId and content to the addComment function
      await addComment(recipeId, content);

      // Clear content and reload comments
      setContent('');
      loadComments();
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to add comment');
      console.error('Failed to add comment:', err);
    }
  };

  return (
    <div>
      {/* Comment form */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Add Comment</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Comment list */}
      <div>
        {comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.creator}: {comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeComments;
