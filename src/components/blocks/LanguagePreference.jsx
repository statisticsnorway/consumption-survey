import { RadioGroup } from '@statisticsnorway/ssb-component-library'
import { i18n } from '../../../i18n'

import { usePreference } from '../../hocs/preference'
import { SUPPORTED_PREFERENCES } from '../common/contexts'
import { LANGUAGES } from '../../utils/jsUtils'

const LanguagePreference = () => {
  const [languagePreference, setLanguagePreference] = usePreference(
    SUPPORTED_PREFERENCES.LANG
  )
  return (
    <RadioGroup
      onChange={(newLang) => {
        i18n.changeLanguage(newLang).then(() => {
          setLanguagePreference(newLang)
        })
      }}
      selectedValue={i18n.language}
      orientation='column'
      items={Object.keys(LANGUAGES).map((key) => ({
        label: LANGUAGES[key],
        value: key,
      }))}
    />
  )
}
export default LanguagePreference
