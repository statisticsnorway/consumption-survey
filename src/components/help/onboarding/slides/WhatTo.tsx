import OnboardingCard from '../OnboardingCard';
import { useTranslation } from 'react-i18next';
import Accordion from '../../../common/accordion/Accordion';

export default () => {
    const {t} = useTranslation('onboarding');
    return (
        <OnboardingCard
            title={t('onFBU.whatToRegister.title')}
            description={
                <>
                    <div style={{padding: '30px', textAlign: 'left'}}>
                        <p>{t('onFBU.whatToRegister.intro')}</p>
                        <ul style={{textAlign: 'left'}}>
                            {t('onFBU.whatToRegister.items').split(', ').map(txt => <li>
                                {txt}
                            </li>)}
                        </ul>
                    </div>
                    <div style={{padding: '20px'}}>
                        <Accordion title={t('onFBU.forgottenExpenditures.subtitle')} open={true}>
                            <ul style={{textAlign: 'left'}}>
                                {t('onFBU.forgottenExpenditures.items').split(', ').map(txt => <li>
                                    {txt}
                                </li>)}
                            </ul>
                        </Accordion>
                    </div>

                </>
            }
        />
    );
};
