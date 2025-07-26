import React from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';
import { Comment } from '../models/comment';

interface CommentDisplayProps {
  comments: Comment[];
}

const CommentDisplay: React.FC<CommentDisplayProps> = ({ comments }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {comments.length === 0 ? (
        <Typography variant="body1">No comments yet. Be the first to comment!</Typography>
      ) : (
        comments.map((comment) => (
          <Paper key={comment._id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {comment.creator}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {new Date(comment.creationTime).toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {comment.content}
            </Typography>
          </Paper>
        ))
      )}
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default CommentDisplay;
