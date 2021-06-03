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
    prevHandler?: (e) => void;
    nextHandler?: (e) => void;
    onComplete: () => void;
};

const SlideNav = ({
                      currentSlide,
                      totalSlides,
                      onSlideChange = DO_NOTHING,
                      onComplete,
                      prevHandler,
                      nextHandler,
                      style = {},
                      className = ''
                  }: SlideNavProps) => {
    useEffect(() => {
        onSlideChange(currentSlide);
    }, [currentSlide]);

    const hoppStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div className={styles.slideNavContainer}>
            {currentSlide === (totalSlides - 1) &&
            <button
                className={`ssb-btn primary-btn ${styles.nextButton}`}
                onClick={onComplete}
            >
                Kom i gang!
            </button>
            }
            {currentSlide !== (totalSlides - 1) &&
            <div className={styles.buttonComplex}>
                <button
                    className={`ssb-btn secondary-btn ${styles.nextButton}`}
                    onClick={nextHandler}
                >
                    Neste
                </button>
                <a onClick={onComplete} className={styles.skip}>Hopp over</a>
            </div>
            }
            <div className={`${styles.slideNav} ${className}`} style={style}>
                {range(0, totalSlides).map((idx) => (
                    <div className={`${styles.slideDot} ${currentSlide === idx ? styles.current : ''}`}>
                        &middot;
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SlideNav;
