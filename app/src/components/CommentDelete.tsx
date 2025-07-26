
import React from 'react';
import { Comment } from '../models/comment';
import { Button, List, ListItem, ListItemText } from '@mui/material';

interface CommentListProps {
    comments: Comment[];
    onDelete: (commentId: string) => void;
}

const CommentDelete: React.FC<CommentListProps> = ({ comments, onDelete }) => {
    return (
        <List>
            {comments.map((comment) => (
                <ListItem key={comment.id} divider>
                    <ListItemText 
                        primary={comment.content} 
                        secondary={`By: ${comment.creator} | On: ${comment.creationTime}`} 
                    />
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => onDelete(comment.id)}
                    >
                        Delete
                    </Button>
                </ListItem>
            ))}
        </List>
    );
};

export default CommentDelete;
