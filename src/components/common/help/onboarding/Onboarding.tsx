import { useRouter } from 'next/router';
import { Carousel, Slide } from '../../carousel';

import styles from './onboarding.module.scss';
import { ReactNode, useState } from 'react';

const Onboarding = () => {
    const router = useRouter();
    const [footer, setFooter] = useState<ReactNode>();

    return (
        <Carousel
            onSlideChange={(slide) => {
                console.log('on slide change', slide);
                if (slide === 2) {
                    setFooter(<button className="ssb-btn primary-btn">Kom i gang!</button>);
                } else {
                    setFooter(null);
                }
            }}
            footer={footer}
        >
            <Slide className={`${styles.slide} ${styles.slide1}`}>One</Slide>
            <Slide className={`${styles.slide} ${styles.slide2}`}>Two</Slide>
            <Slide className={`${styles.slide} ${styles.slide3}`}>Three</Slide>
        </Carousel>
    );
};

export default Onboarding;
