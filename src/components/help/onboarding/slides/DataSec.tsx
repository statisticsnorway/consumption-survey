import OnboardingCard from '../OnboardingCard';
import { useTranslation } from 'react-i18next';

export default () => {
    const {t} = useTranslation('onboarding');
    return (
        <OnboardingCard
            title={t('dataSec.consent.title')}
            description={
                <>
                    {t('dataSec.consent.intro')}
                    <ul>
                        {(t('dataSec.consent.bulletPoints', {returnObjects: true}) as string[])
                            .map(txt => <li style={{marginTop: '2px'}}>{txt}</li>)
                        }
                    </ul>
                    {t('dataSec.consent.moreInfo')}
                </>
            }
        />
    );
};
