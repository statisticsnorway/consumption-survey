import OnboardingCard from '../OnboardingCard';
import { useTranslation } from 'react-i18next';

export default () => {
    const {t} = useTranslation('onboarding');
    return (
        <OnboardingCard
            title={t('dataSec.title')}
            description={
                <ul>
                    {(t('dataSec.bullets', {returnObjects: true}) as string[])
                        .map(txt => <li>{txt}</li>)
                    }
                </ul>
            }
        />
    );
};
