import { useEffect } from 'react';
import { range } from 'rambda';
import { DO_NOTHING } from '../../../utils/jsUtils';

import styles from './carousel.module.scss';
import { isPWACompatible } from '../../../utils/pwaUtils';
import { useRouter } from 'next/router';
import { PATHS } from '../../../uiConfig';

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
    const router = useRouter();
    useEffect(() => {
        onSlideChange(currentSlide);
    }, [currentSlide]);

    const hoppStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const hopOver = (
        <a onClick={onComplete} className={styles.skip}>Hopp over</a>
    );

    return (
        <div className={styles.slideNavContainer}>
            {(currentSlide === (totalSlides - 1))  &&
                <span
                    className={styles.continueInBrowserLink}
                    onClick={() => {router.push(PATHS.HOME); }}
                >
                    Fortsett i nettleseren
                </span>
            }
            {currentSlide !== (totalSlides - 1) &&
            <div className={styles.buttonComplex}>
                <button
                    className={`ssb-btn secondary-btn ${styles.nextButton}`}
                    onClick={nextHandler}
                >
                    Neste
                </button>
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
