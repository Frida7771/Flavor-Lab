import React from 'react';
import styles from '../styles/components/HeroImage.module.css';

interface HeroImageProps {
    imageUrl: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ imageUrl }) => {
    // console.log('Image URL:', imageUrl); // Debugging
    return (
        <div className={styles.heroImage} style={{ backgroundImage: `url("${imageUrl}")` }} />
    );
};

export default HeroImage;
