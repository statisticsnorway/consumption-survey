import OnboardingCard from '../OnboardingCard';
import { useTranslation } from 'react-i18next';
import ImagePlaceholder from './ImagePlaceholder';

export default () => {
    const {t} = useTranslation('onboarding');
    return (
        <OnboardingCard
            title={t('onFBU.title')}
            image={<ImagePlaceholder/>}
            description={
                <>
                    <p>{t('onFBU.description')}</p>
                    <a href={t('onFBU.detailsLink')}>{t('onFBU.detailsLinkText')}</a>
                </>
            }
        />
    );
};
