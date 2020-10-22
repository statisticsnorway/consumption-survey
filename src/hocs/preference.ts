import { useContext, useState, useEffect, useReducer } from 'react'
import { PreferencesContext } from '../components/common/contexts'

export const usePreference = (pref) => {
  const {
    preferences,
    updateMemory,
    setPreference,
    getPreference,
  } = useContext(PreferencesContext)
  const [preferenceValue, setPreferenceValue] = useState(preferences[pref])

  useEffect(() => {
    console.log(preferenceValue)
    console.log('preferences', preferences)
    getPreference(pref).then((res) => {
      if (res) {
        console.log('init', res)
        setPreferenceValue(res)
      }
    })
  }, [])
  useEffect(() => {
    console.log('PREFVAL:', preferenceValue)

    setPreference(pref, preferenceValue).then(() => {
      updateMemory(pref, preferenceValue)
      console.log('set')
    })
  }, [preferenceValue])
  /*useEffect(() => {
    getPreference(pref).then((res) => {
      if (res) {
        console.log('change', res)
        setPreferenceValue(res)
      }
    })
  }, [preferences])*/

  return [preferenceValue, setPreferenceValue] as [any, (pref: any) => any]
}
