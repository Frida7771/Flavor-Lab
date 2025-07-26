import React from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useComments } from '../hooks/useComments';
import AddComment from './AddComment';
import CommentDisplay from './CommentDisplay';

interface CommentSectionProps {
  recipeId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ recipeId }) => {
  const { comments, loading, error, refetch } = useComments(recipeId);

  const handleCommentAdded = () => {
    refetch();
  };

  return (
    <Box sx={{ mt: 4, width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <AddComment recipeId={recipeId} onSuccess={handleCommentAdded} />
      <CommentDisplay comments={comments} />
    </Box>
  );
};

export default CommentSection;
