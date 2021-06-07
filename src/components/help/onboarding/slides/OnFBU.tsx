import OnboardingCard from '../OnboardingCard';
import { useTranslation } from 'react-i18next';
import ImagePlaceholder from './ImagePlaceholder';
import style from '../onboarding.module.scss';
import Accordion from '../../../common/accordion/Accordion';

export const ON_FBU_COMP = (t) => (
    <>
        <div style={{backgroundColor: '#f0f8f9', padding: '30px', textAlign: 'left'}}>
            <h2 className={'ssb-title'}>{t('onFBU.dataUse.title')}</h2>
            <ul style={{textAlign: 'left'}}>
                {t('onFBU.dataUse.items').split(', ').map(txt => <li>
                    {txt}
                </li>)}
            </ul>
        </div>
        <div style={{padding: '30px', textAlign: 'left'}}>
            <h2 className={'ssb-title'}>{t('onFBU.whatToRegister.title')}</h2>
            <p>{t('onFBU.whatToRegister.intro')}</p>
            <ul style={{textAlign: 'left'}}>
                {t('onFBU.whatToRegister.items').split(', ').map(txt => <li>
                    {txt}
                </li>)}
            </ul>
        </div>
        <div style={{padding: '20px'}}>
            <Accordion title={t('onFBU.forgottenExpenditures.subtitle')}>
                <ul style={{textAlign: 'left'}}>
                    {t('onFBU.forgottenExpenditures.items').split(', ').map(txt => <li>
                        {txt}
                    </li>)}
                </ul>
            </Accordion>
        </div>
    </>
);

export default () => {
    const {t} = useTranslation('onboarding');
    return (
        <div className={style.onFbuOuter} style={{textAlign: 'center'}}>
            <div style={{padding: '45px'}}>
                <h1 className={'ssb-title'}>{t('onFBU.title')}</h1>
                <p>{t('onFBU.description')}</p>
            </div>
            <div style={{backgroundColor: '#f0f8f9', padding: '30px', textAlign: 'left'}}>
                <h2 className={'ssb-title'}>{t('onFBU.dataUse.title')}</h2>
                <ul style={{textAlign: 'left'}}>
                    {t('onFBU.dataUse.items').split(', ').map(txt => <li>
                        {txt}
                    </li>)}
                </ul>
            </div>

            {/*
             <OnboardingCard
            title={t('onFBU.title')}
            image={<ImagePlaceholder/>}
            description={
                <>
                    <p>{t('onFBU.description')}</p>
                    <div style={{backgroundColor: '#f0f8f9'}}>
                        <h2>{t('onFBU.dataUse.title')}</h2>
                        <ul>
                            {t('onFBU.dataUse.items').split(', ').map(txt => <li>
                                {txt}
                            </li>)}
                        </ul>
                    </div>
                </>
            }
        />
             */}
        </div>


    );
};