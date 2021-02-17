import { ReactNode, ReactNodeArray } from 'react';

import styles from './carousel.module.scss';

export type SlideProps = {
    bgColor?: string;
    className?: string;
    children: ReactNode | ReactNodeArray;
};

const Slide = ({ className = '', children }: SlideProps) => {
    return (
        <div className={`${styles.slide} ${className}`}>
            {children}
        </div>
    );
};

export default Slide;
