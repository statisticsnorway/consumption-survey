import styles from './carousel.module.scss';
import { range } from 'rambda';
import { DO_NOTHING } from '../../../utils/jsUtils';
import { useEffect } from 'react';

export type SlideNavProps = {
    currentSlide: number;
    totalSlides: number;
    style?: object;
    className?: string;
    onSlideChange?: (currentSlide: number) => void;
};

const SlideNav = ({ currentSlide, totalSlides, onSlideChange = DO_NOTHING, style = {}, className = ''}: SlideNavProps) => {
    useEffect(() => {
        onSlideChange(currentSlide);
    }, [currentSlide]);

    return (
        <div className={`${styles.slideNav} ${className}`} style={style}>
            {range(0, totalSlides).map((idx) => (
                <div className={`${styles.slideDot} ${currentSlide === idx ? styles.current : ''}`}>
                    &middot;
                </div>
            ))}
        </div>
    );
};

export default SlideNav;
