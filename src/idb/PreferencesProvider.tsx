import { useEffect, useState } from 'react'
import { get, set, getAll, keys } from './preferences'
import { PreferencesContext } from '../components/common/contexts'

const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({})

  useEffect(() => {
    const addPreference = async (keys) => {
      let temp = {}
      for (let i = 0; i < keys.length; i++) {
        const val = await get(keys[i])
        temp = { ...temp, [keys[i]]: val }
      }
      setPreferences(temp)
    }

    keys().then((keys) => {
      console.log('loaded', keys)
      addPreference(keys)
    })
  }, [])

  const getPreference = (key: string): any => {
    return get(key)
  }

  const setPreference = (key: string, value: any) => {
    return set(key, value)
  }

  const updateMemory = (key: string, value: any) => {
    setPreferences({ ...preferences, [key]: value })
  }

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updateMemory,
        setPreference,
        getPreference,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export default PreferencesProvider
