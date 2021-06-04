import { isIOS } from 'react-device-detect';
import { Carousel, Slide } from '../../common/carousel';
import OnFBU from './slides/OnFBU';
import HowTo from './slides/HowTo';
import DataSec from './slides/DataSec';
import { AppContextStatus } from '../../../uiContexts';
import { APP_META_KEYS } from '../../../pages/_app';
import IOSInstallInstructions from '../install/IOSInstallInstructions';
import { useTranslation } from 'react-i18next';
import AndroidInstallInstructions from '../install/AndroidInstallInstructions';
import PWA from './slides/PWA';

const Onboarding = () => {
    const {t: wt} = useTranslation('welcome');

    return (
        <Carousel
            onComplete={() => {
                if (typeof window !== 'undefined') {
                    localStorage.setItem(APP_META_KEYS.ONBOARDING, AppContextStatus.COMPLETE);
                }
            }}
       >
            <Slide><OnFBU/></Slide>
            <Slide><HowTo/></Slide>
            <Slide><DataSec/></Slide>
            <Slide><PWA/></Slide>
        </Carousel>
    )
};

export default Onboarding;
