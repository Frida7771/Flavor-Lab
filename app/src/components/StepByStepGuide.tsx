import React from 'react';
import styles from '../styles/components/StepByStepGuide.module.css';

interface StepByStepGuideProps {
  steps: string[];
}

const StepByStepGuide: React.FC<StepByStepGuideProps> = ({ steps }) => (
  <div className={styles.stepGuide}>
    <h2>Step-by-Step Guide</h2>
    <ol className={styles.stepsList}>
      {steps.map((step, index) => (
        <li key={index} className={styles.step}>
          {step}
        </li>
      ))}
    </ol>
  </div>
);

export default StepByStepGuide;
