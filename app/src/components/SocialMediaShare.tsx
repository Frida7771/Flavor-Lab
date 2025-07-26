import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from 'react-share';

interface SocialMediaShareProps {
  url?: string;
  title?: string;
}

const SocialMediaShare: React.FC<SocialMediaShareProps> = ({
  title = document.title,
  url = window.location.href,
}) => {
  const message = "Check out this new recipe!"; 

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <FacebookShareButton url={url} title={`${message} ${title}`}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={`${message} ${title}`}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={`${message} ${title}`}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <TelegramShareButton url={url} title={`${message} ${title}`}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
    </div>
  );
};

export default SocialMediaShare;
