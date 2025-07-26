import { useState, useEffect } from 'react';
import { Comment } from '../models/comment';
import { getCommentsByRecipeId } from '../services/CommentService';

export const useComments = (recipeId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedComments = await getCommentsByRecipeId(recipeId);
      setComments(fetchedComments);
    } catch (err) {
      setError('Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [recipeId]);

  return { comments, loading, error, refetch };
};
