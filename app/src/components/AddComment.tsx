import React, { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { addComment } from '../services/CommentService';
import { RootState } from '../services/store';

interface AddCommentProps {
  recipeId: string;
  onSuccess: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ recipeId, onSuccess }) => {
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = useSelector((state: RootState) => state.auth.user?.userid);

  const handleSubmit = async () => {
    if (!commentText.trim()) {
      setError('Comment cannot be empty.');
      return;
    }
    if (!userId) {
      setError('You must be logged in to add a comment.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await addComment(recipeId, commentText, userId);
      setCommentText('');
      onSuccess(); // Trigger refetch of comments
    } catch (err: any) {
      console.error('Error adding comment:', err);
      setError(err.message || 'Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Write a comment..."
        variant="outlined"
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        multiline
        rows={3}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Add Comment'}
      </Button>
    </Box>
  );
};

export default AddComment;
