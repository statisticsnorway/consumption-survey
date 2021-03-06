import { useTranslation } from 'react-i18next';
import Workspace from '../../components/layout/workspace/Workspace';
import PageTitle from '../../components/common/PageTitle';
import Accordion from '../../components/common/accordion/Accordion';
import { ON_FBU_COMP } from '../../components/help/onboarding/slides/OnFBU';
import DataSec from '../../components/help/onboarding/slides/DataSec';
import HowTo from '../../components/help/onboarding/slides/HowTo';

const AboutPage = () => {
    const {t} = useTranslation('onFbu')
    const {t: ot} = useTranslation('onboarding');
    return (
        <Workspace>
            <PageTitle title={t('title')}/>
            <div style={{ marginBottom: '1.25rem'}}>
                {t('surveyInfo')}: <a href={t('website')}>{t('website')}</a>
            </div>
            <Accordion title={t('privacy.title')}>
                <ul>
                    {t('privacy.bulletPoints', {returnObjects: true}).map(point =>
                        <li>{point}</li>
                    )}
                </ul>
                {t('privacy.privacyInfo')}
            </Accordion>
            <Accordion title="Samtykke">
                <DataSec/>
            </Accordion>
            <Accordion title="Hva skal registreres">
                {ON_FBU_COMP(ot)}
            </Accordion>
            <Accordion title="Hvordan registrer du">
                <HowTo/>
            </Accordion>
        </Workspace>
    );
};

export default AboutPage
