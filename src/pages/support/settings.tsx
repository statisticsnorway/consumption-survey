import { useRouter } from 'next/router'
import {
  RadioGroup,
  CheckboxGroup,
} from '@statisticsnorway/ssb-component-library'
import { i18n, withTranslation } from '../../../i18n'
import SettingsPanel from '../../components/blocks/SettingsPanel'
import { WorkspacePanel } from '../../components/layout/Workspace'
import { LANGUAGES } from '../../utils/jsUtils'
import { useLoader } from '../../hocs/globalLoader'
import { usePreference } from '../../hocs/preference'
import { SUPPORTED_PREFERENCES as SP } from '../../components/common/contexts'
import { CONTACT_METHODS as CM } from '../../utils/jsUtils'

const Settings = ({ t }) => {
  const router = useRouter()
  const { setLoading } = useLoader()
  const [contactPreference, setContactPreference] = usePreference(SP.CONTACT)
  const [languagePreference, setLanguagePreference] = usePreference(SP.LANG)

  return (
    <>
      <h3>{t('title')}</h3>
      <p>{t('test')}</p>
      <WorkspacePanel>
        <SettingsPanel
          title={t('pin.title')}
          description={t('pin.description')}
          onClick={() => {
            router.push('/support/manage-pin')
          }}
        />
        <SettingsPanel
          expandable={true}
          title={t('language.title')}
          description={LANGUAGES[i18n.language]}
        >
          <RadioGroup
            onChange={(newLang) => {
              setLoading(true)
              i18n.changeLanguage(newLang).then(() => {
                setLanguagePreference(newLang).then(() => {
                  setLoading(false)
                })
              })
            }}
            selectedValue={i18n.language}
            orientation='column'
            items={Object.keys(LANGUAGES).map((key) => ({
              label: LANGUAGES[key],
              value: key,
            }))}
          />
        </SettingsPanel>
        <SettingsPanel
          expandable={true}
          title={t('contact.title')}
          description={t('contact.description')}
        >
          <CheckboxGroup
            onChange={(cp) => {
              console.log('Set value:', cp)
              setContactPreference(cp)
            }}
            selectedValues={contactPreference}
            orientation='column'
            items={Object.keys(CM).map((key) => ({
              label: t('contact.method.' + key),
              value: key,
            }))}
          />
        </SettingsPanel>
      </WorkspacePanel>
    </>
  )
}

Settings.getInitialProps = async () => ({
  namespacesRequired: ['settings'],
})

export default withTranslation('settings')(Settings)
