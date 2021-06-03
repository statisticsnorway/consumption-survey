import { useRouter } from 'next/router';
import { Carousel, Slide } from '../../common/carousel';
import OnFBU from './slides/OnFBU';
import Goals from './slides/Goals';
import HowTo from './slides/HowTo';
import DataSec from './slides/DataSec';
import { PATHS } from '../../../uiConfig';

const Onboarding = () => {
    const router = useRouter();

    const onComplete = () => {
        router.push(PATHS.HOME);
    };

    return (
        <Carousel
            onComplete={onComplete}
        >
            <Slide><OnFBU/></Slide>
            <Slide><HowTo/></Slide>
            <Slide><DataSec/></Slide>
        </Carousel>
    );
};

export default Onboarding;
