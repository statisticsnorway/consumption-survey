import { useContext, useEffect, useState } from 'react'
import {
  SUPPORTED_PREFERENCES,
  PreferencesContext,
} from '../components/common/contexts'
export const useContact = () => {
  const { preferences, getPreference, setPreference } = useContext(
    PreferencesContext
  )
  const [contactPref, setContactPref] = useState(preferences.contact)

  useEffect(() => {
    console.log('[Contact] INIT : load')
    getPreference(SUPPORTED_PREFERENCES.CONTACT).then((val) => {
      if (val) {
        console.log('Fetched', val)
        setContactPref(val)
      } else {
        console.log('No pref found, ignoring')
      }
    })
  }, [])

  useEffect(() => {
    console.log('[Contact] Prefs changed : saving...')
    setPreference(SUPPORTED_PREFERENCES.CONTACT, contactPref).then((res) => {
      console.log('Saved. check db')
    })
  }, [contactPref])

  useEffect(() => {
    console.log('[Contact] Prefs Changed. updating state...')
    // TODO : DRY
    getPreference(SUPPORTED_PREFERENCES.CONTACT).then((val) => {
      if (val) {
        console.log('new contact pref', val)
        setContactPref(val)
      } else {
        console.log('contact pref does not seem to have changed, ignoring')
      }
    })
  }, [preferences])

  return [contactPref, setContactPref] as const
}
