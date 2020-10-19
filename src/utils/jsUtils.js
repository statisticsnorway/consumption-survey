export const hasKey = (obj, key) => {
  return obj && key && obj.hasOwnProperty(key)
}

export const LANGUAGES = {
  en: 'English',
  nb: 'Bokmål',
  nn: 'Nynorsk',
}

export const CONTACT_METHODS = {
  sms: 'sms',
  email: 'e-post',
}
