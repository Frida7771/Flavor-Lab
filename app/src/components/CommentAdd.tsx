//Component for adding new comments
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

interface CommentFormProps {
    onAddComment: (content: string) => void;
}

const CommentAdd: React.FC<CommentFormProps> = ({ onAddComment }) => {
    const [content, setContent] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            onAddComment(content);
            setContent(''); // Clear the input field after submission
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Write a comment"
                fullWidth
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                variant="outlined"
                style={{ marginBottom: '10px' }}
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default CommentAdd;
