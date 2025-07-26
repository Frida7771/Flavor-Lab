import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button, Divider } from '@mui/material';
import { Comment } from '../models/comment';
import { getCommentsByUserId, deleteComment } from '../services/CommentService';
import SinglePageMenuAppBar from '../components/SinglePageNavBar';
import { getUserIdFromCookie } from '../services/userService';

const CommentPage: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const loadComments = async () => {
            try {
                const userId = getUserIdFromCookie(); // Get the user ID from the cookie
                if (!userId) {
                    setIsLoggedIn(false); // Guest user
                    return;
                }

                setIsLoggedIn(true); // Logged-in user

                // Fetch comments for the current user
                const data = await getCommentsByUserId(userId);
                console.log("Fetched Comments:", data); // Log the fetched comments for debugging
                setComments(data); // Set the comments state with the fetched data

            } catch (error) {
                setError('Failed to fetch user comments.');
                console.error(error);
            }
        };

        loadComments();
    }, []);

    const handleDeleteComment = async (commentId: string) => {
        try {
            await deleteComment(commentId);
            // Update state to remove the deleted comment
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (error) {
            setError('Failed to delete comment.');
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <>
            <Box
                sx={(theme) => ({
                    marginTop: `${theme.mixins.toolbar.minHeight}px`,
                    [theme.breakpoints.up('xs')]: {
                        '@media (orientation: landscape)': {
                            marginTop: `48px`,
                        },
                    },
                    [theme.breakpoints.up('sm')]: {
                        marginTop: `64px`,
                    },
                })}
            >
                <SinglePageMenuAppBar pageName="My Comments" />
                <Container maxWidth="md">
                    <Paper style={{ padding: '20px', marginTop: '20px' }}>
                        <Typography variant="h5">My Comments</Typography>
                        {error && <Typography variant="body1" color="error">{error}</Typography>}
                        {!isLoggedIn ? (
                            <Typography variant="body1" color="textSecondary" style={{ marginTop: '10px' }}>
                                User is not logged in.
                            </Typography>
                        ) : Array.isArray(comments) && comments.length === 0 ? (
                            <Typography variant="body1" color="textSecondary" style={{ marginTop: '10px' }}>
                                This user doesn't have any comments yet.
                            </Typography>
                        ) : (
                            comments.map((comment, index) => (
                                <div key={comment._id} style={{ marginBottom: '10px' }}>
                                    <Typography variant="body1">
                                        <strong>{comment.creator}:</strong> {comment.content}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {new Date(comment.creationTime).toLocaleString()}
                                    </Typography>

                                    {/* Delete Button */}
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDeleteComment(comment._id)}
                                        style={{ marginTop: '10px' }}
                                    >
                                        Delete Comment
                                    </Button>
                                    {index < comments.length - 1 && <Divider sx={{ my: 2 }} />}
                                </div>
                            ))
                        )}
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default CommentPage;
