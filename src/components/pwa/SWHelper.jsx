import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isWorkboxActive } from '../../utils/pwaUtils';
import { VersionUpdateSnackbar } from '../common/dialog/Snackbar';

const readyForReload = (state) =>
    ['installed', 'externalinstalled', 'waiting', 'externalwaiting']
        .includes(state);


const SWHelper = ({ isOnline, firstVisitWeb }) => {
    const router = useRouter();
    const [registration, setRegistration] = useState(null);
    const [showReload, setShowReload] = useState(false);

    useEffect(() => {
        if (isWorkboxActive() && isOnline) {
            // skip index route (already cached as start_url)
            if (registration) {
                console.log('Route change and registration is active - checking for updates');
                registration.update();
            } else {
                console.log('Route change but no registrations found or is offline. skipping.. ');
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
                        setShowReload(true);
                    }
                })
            });
        }
    }, [registration, firstVisitWeb])

    useEffect(() => {
        if (isWorkboxActive()) {
            const wb = window.workbox;
            wb.register()
                .then((reg) => {
                    setRegistration(reg);

                });
        }
    }, []);

    return <VersionUpdateSnackbar open={showReload} />;
};

export default SWHelper;
