import Workspace from "../../components/layout/workspace/Workspace";
import PageTitle from "../../components/common/PageTitle";
import {useTranslation} from "react-i18next";


const AboutPage = () => {
  const {t} = useTranslation('onFbu')
    return (
      <Workspace>
          <PageTitle title={t('title')} />
          <div>
              {t('surveyInfo')}{t('website')}
              <h3 className={'ssb-title'}>{t('privacy.title')}</h3>
              <ul>
                  {t('privacy.bulletPoints', {returnObjects: true}).map(point =>
                    <li>{point}</li>
                  )}
              </ul>
              {t('privacy.privacyInfo')}
          </div>
      </Workspace>
  )
}

export default AboutPage