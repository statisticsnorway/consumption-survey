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

// Currency
export const NOK = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' });

export const krCents = (amt) =>
    NOK.format(amt).replace('NOK', '');
