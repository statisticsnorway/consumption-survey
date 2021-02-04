import OnboardingCard from '../OnboardingCard';
import { useTranslation } from 'react-i18next';
import ImagePlaceholder from './ImagePlaceholder';

export default () => {
    const {t} = useTranslation('onboarding');
    return (
        <OnboardingCard
            title={t('goals.title')}
            image={<ImagePlaceholder/>}
            description={
                <>
                    <p>{t('goals.description1')}</p>
                    <p>{t('goals.description2')}</p>
                </>
            }
        />
    );
};
