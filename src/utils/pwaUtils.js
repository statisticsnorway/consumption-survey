export const isBrowser = () => (typeof window !== 'undefined')

export const isServiceWorker = () =>
    isBrowser() && ('serviceWorker' in navigator)

export const isWorkboxActive = () =>
    isServiceWorker() && window.workbox !== undefined

export const isPWA = () => {
    console.log('Navigator: ', window.navigator);
    console.log('window::media', window.matchMedia('(display-mode: standalone)'));
    console.log('referrer', document.referrer);

    const result = window.navigator.standalone
        || window.matchMedia('(display-mode: standalone)').matches
        || document.referrer.includes('android-app://');

    console.log('isPWA', result);
    return result;
};
