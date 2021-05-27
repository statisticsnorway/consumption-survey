import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isBrowser, isWorkboxActive } from '../utils/pwaUtils'

const readyForReload = (state) =>
    ['installed', 'externalinstalled', 'waiting', 'externalwaiting']
        .includes(state);

const useServiceWorkerHelper = () => {
    const router = useRouter();
    const [registration, setRegistration] = useState(null);
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [showUpdateSnackbar, setShowUpdateSnackBar] = useState<boolean>(false);

    useEffect(() => {
        if (isBrowser() && ('ononline' in window) && ('onoffline' in window)) {
            setIsOnline(window.navigator.onLine);

            if (!window.ononline) {
                window.addEventListener('online', () => {
                    setIsOnline(true);
                });
            }

            if (!window.onoffline) {
                window.addEventListener('offline', () => {
                    setIsOnline(false);
                });
            }
        }
    }, []);

    useEffect(() => {
        if (isWorkboxActive() && isOnline) {
            // check for updates
            if (registration) {
                console.log('Route change and registration is active - checking for updates');
                registration.update();
            } else {
                console.log('Route change but no registrations found or is offline. skipping.. ');
            }

            // ensure caching
            if (router.route !== '/') {
                // @ts-ignore
                const wb = window.workbox;
                wb.active.then(worker => {
                    console.log('sending cache request for', router.route);
                    wb.messageSW({ action: 'CACHE_NEW_ROUTE' });
                });
            }
        } else {
        }
    }, [isOnline, router.route]);

    useEffect(() => {
        if (registration) {
            registration.addEventListener('updatefound', (updateEvent) => {
                console.log('Update found', updateEvent);
                const newSW = registration.installing;
                newSW.addEventListener('statechange', (stateChgEvt) => {
                    if (stateChgEvt.target && readyForReload(stateChgEvt.target.state)) {
                        setShowUpdateSnackBar(true);
                    }
                })
            });
        }
    }, [registration])

    useEffect(() => {
        if (isWorkboxActive()) {
            // @ts-ignore
            const wb = window.workbox;
            wb.register()
                .then((reg) => {
                    setRegistration(reg);

                });
        }
    }, []);

    return {showUpdateSnackbar};
};

export default useServiceWorkerHelper;
