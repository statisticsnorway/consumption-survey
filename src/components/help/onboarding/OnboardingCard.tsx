import { ReactNode } from 'react';

import styles from './onboarding.module.scss';

export type OnboardingCardProps = {
    title: string;
    image?: ReactNode;
    description: ReactNode;
};

const OnboardingCard = ({title, image = null, description}: OnboardingCardProps) => (
    <div className={styles.onboardingCard}>
        <h1 className={styles.title}>{title}</h1>
        {image && <div className={styles.image}>{image}</div>}
        <div className={styles.description}>{description}</div>
    </div>
);

export default OnboardingCard;
