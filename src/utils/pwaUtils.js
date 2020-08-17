export const isPWA = () => {
    console.log('Navigator: ', window.navigator);
    console.log('window::media', window.matchMedia('(display-mode: standalone)'));
    console.log('referrer', document.referrer);

    const result = window.navigator.standalone
    || window.matchMedia('(display-mode: standalone)').matches
    || document.referrer.includes('android-app://');

    console.log('isPWA', result);
    return result;
}
