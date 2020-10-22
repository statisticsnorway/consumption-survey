import { useState, useEffect } from 'react'
import { CheckboxGroup } from '@statisticsnorway/ssb-component-library'
import { usePreference } from '../../hocs/preference'
import { SUPPORTED_PREFERENCES } from '../common/contexts'
import { i18n, withTranslation } from '../../../i18n'
import { CONTACT_METHODS } from '../../utils/jsUtils'

const ContactPreferences = ({ t }) => {
  const [contactPreference, setContactPreference] = usePreference(
    SUPPORTED_PREFERENCES.CONTACT
  )
  return (
    <div>
      {
        <CheckboxGroup
          onChange={(cp) => {
            setContactPreference(cp)
          }}
          selectedValues={contactPreference}
          orientation='column'
          items={Object.keys(CONTACT_METHODS).map((key) => ({
            label: t('contact.method.' + key),
            value: key,
          }))}
        />
      }
    </div>
  )
}

export default withTranslation('settings')(ContactPreferences)
