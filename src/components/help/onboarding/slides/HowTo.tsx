import OnboardingCard from '../OnboardingCard';
import { useTranslation } from 'react-i18next';
import ImagePlaceholder from './ImagePlaceholder';
import Accordion from '../../../common/blocks/accordion/Accordion';

export default () => {
    const {t} = useTranslation('onboarding');
    return (
        <OnboardingCard
            title={t('howTo.title')}
            description={
                <>
                    <p>{t('howTo.description')}</p>
                    <p style={{marginBottom: '2.5rem', color: '#6C9099'}}>{t('howTo.tip')}</p>
                    <Accordion title={t('howTo.purchases.title')}>{t('howTo.purchases.description')}</Accordion>
                    <Accordion title={t('howTo.expenses.title')}>{t('howTo.expenses.description')}</Accordion>
                    <Accordion title={t('howTo.forms.title')}>{t('howTo.forms.description')}</Accordion>
                </>
            }
        />
    );
};
