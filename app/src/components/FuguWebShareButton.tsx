import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';

interface ShareButtonProps {
    title?: string;
    text?: string;
    url?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
    title = document.title,
    text = "Check out this new recipe!",
    url = window.location.href,
}) => {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url,
                });
                console.log('Content shared successfully');
            } catch (error) {
                console.error('Error sharing content:', error);
            }
        } else {
            console.warn('Web Share API is not supported in this browser.');
            alert('Sharing is not supported in this browser.');
        }
    };

    return (
        <IconButton
            onClick={handleShare}
            color="primary"
            size="small"
            aria-label="share"
        >
            <ShareIcon fontSize="small" />
        </IconButton>
    );
};

export default ShareButton;
