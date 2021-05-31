import {useTranslation} from "react-i18next";
import Workspace from "../../components/layout/workspace/Workspace";
import PageTitle from "../../components/common/PageTitle";

const ContactPage = () => {
    const {t} = useTranslation('contact')
    return (
        <Workspace>
            <PageTitle title={t('title')} />
            <div>
                {t('contactInfo')}
            </div>
            <h3 className={'ssb-title'}>{t('fbuHeader')}</h3>
            <span>{t('openingHours')}</span>
            <span>{t('phoneNumber')}</span>
            <span>{t('email')}</span>
        </Workspace>
    )
}

export default ContactPage