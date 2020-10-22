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
          selectedValues={
            //assumption is that if no preference has been set aka first login
            // - set inApp-method as selected, it will then be added to contact preference
            // - else show preferences (which should now contain inapp)
            //is this a bit dirty?
            contactPreference ? contactPreference : [CONTACT_METHODS.inApp]
          }
          orientation='column'
          items={Object.keys(CONTACT_METHODS).map((key) => ({
            label: t('contact.method.' + key),
            value: key,
            disabled: key === CONTACT_METHODS.inApp ? true : false,
          }))}
        />
      }
    </div>
  )
}

export default withTranslation('settings')(ContactPreferences)
