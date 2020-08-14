export const isPWA = () =>
    window.navigator.standalone
    || window.matchMedia('(display-mode: standalone)').matches
    || document.referrer.includes('android-app://');
