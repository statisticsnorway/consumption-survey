import OnboardingCard from '../OnboardingCard';
import { useTranslation } from 'react-i18next';
import Accordion from '../../../common/accordion/Accordion';

export default () => {
    const {t} = useTranslation('onboarding');
    return (
        <OnboardingCard
            title={t('howTo.title')}
            description={
                <>
                    <h3 style={{marginBottom: '5px'}}>{t("howTo.toComplete.title")}</h3>
                    <ul>
                        <li>{t('howTo.toComplete.todos.registering')}</li>
                        <li style={{marginTop: '2px'}}>{t('howTo.toComplete.todos.questionnaire')}</li>
                    </ul>
                    <h3 style={{marginBottom: '5px'}}>{t("howTo.howToComplete.title")}</h3>
                    <ul>
                        <li>{t('howTo.howToComplete.tooling.fromReceipt')}</li>
                        <li style={{marginTop: '2px'}}>{t('howTo.howToComplete.tooling.manual')}</li>
                    </ul>
                    {t('howTo.incentive')}
                    <span style={{fontSize: '1.2rem', marginTop: '25px'}}>{t('howTo.message')}</span>

                </>
            }
        />
    );
};
