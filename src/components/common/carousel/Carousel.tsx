import { ReactNode, ReactNodeArray, Children, ReactElement } from 'react';
import ReCarousel from './ReCarousel';
import Slide from './Slide';
import SlideNav from './SlideNav';

import styles from './carousel.module.scss';
import { ReactElementLike } from 'prop-types';
import { DO_NOTHING } from '../../../utils/jsUtils';

export enum Direction {
    HORIZONTAL,
    VERTICAL,
};

export type CarouselProps = {
    direction?: Direction;
    style?: object;
    footer?: ReactNode;
    showNav?: boolean;
    children: ReactNode | ReactNodeArray;
    onSlideChange?: (currentSlide: number) => void;
    onComplete: () => void;
};

const Carousel = ({
                      direction = Direction.HORIZONTAL,
                      style = {},
                      footer,
                      showNav = true,
                      children,
                      onSlideChange = DO_NOTHING,
                      onComplete,
                  }: CarouselProps) => {

    return (
        <ReCarousel
            axis={direction === Direction.HORIZONTAL ? 'x' : 'y'}
            widgets={showNav ? [SlideNav] : []}
            className={styles.carousel}
            footer={footer}
            onSlideChange={onSlideChange}
            onComplete={onComplete}
        >
            {children}
        </ReCarousel>
    );
};

export default Carousel;
