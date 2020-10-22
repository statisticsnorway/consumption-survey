export const hasKey = (obj, key) => {
  return obj && key && obj.hasOwnProperty(key)
}

export const LANGUAGES = {
  en: 'English',
  nb: 'Bokmål',
  nn: 'Nynorsk',
}

export const CONTACT_METHODS = {
  inApp: 'inApp',
  sms: 'sms',
  email: 'email',
}
