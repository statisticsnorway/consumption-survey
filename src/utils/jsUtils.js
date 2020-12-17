export const hasKey = (obj, key) => {
  return obj && key && obj.hasOwnProperty(key);
};

export const LANGUAGES = {
  en: 'English',
  nb: 'Bokmål',
  nn: 'Nynorsk',
};

// Functions
export const DO_NOTHING = () => {};
export const IDENTITY_FN = x => x;
