import {
    isIOS,
    isMobileSafari,
    isAndroid,
    isChrome,
    isDesktop,
} from 'react-device-detect';
import OnboardingCard from '../OnboardingCard';
import { useTranslation } from 'react-i18next';
import IOSInstallInstructions from '../../install/IOSInstallInstructions';
import AndroidInstallInstructions from '../../install/AndroidInstallInstructions';
import OpenInSupportedBrowser from '../../install/OpenInSupportedBrowser';
import { isPWACompatible } from '../../../../utils/pwaUtils';

export default () => {
    const {t: it} = useTranslation('install');
    const {t: wt} = useTranslation('welcome');

    return isPWACompatible ? (
        <OnboardingCard
            title={it('title')}
            description={
                <>
                    {isIOS && <IOSInstallInstructions t={wt}/>}
                    {(isAndroid || isDesktop) && <AndroidInstallInstructions t={wt}/>}
                </>
            }
        />
    ) : (
        <OnboardingCard
            title={it('unsupported.title')}
            description={<OpenInSupportedBrowser/>}
        />
    );
};
