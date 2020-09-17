import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isBrowser, isWorkboxActive } from '../../utils/pwaUtils';

import styles from './sw.module.scss';

const ServiceWorkerStatus = () => {
    const [events, setEvents] = useState([]);
    const [isOnline, setIsOnline] = useState(true);
    const router = useRouter();
    const [reg, setReg] = useState();

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
        console.log(`route/conn change => ${router.route}/${isOnline}`);
        if (isWorkboxActive() && isOnline) {
            // skip index route (already cached as start_url)
            if (reg) {
                console.log('reg is active - forcing update');
                reg.update();
            } else {
                console.log('no reg found');
            }
        } else {
        }
    }, [isOnline, router.route]);

    const logEvent = (event) => {
        console.log(event);
        setEvents(prev => [...prev, event.type]);
    };

    useEffect(() => {
        if (isWorkboxActive()) {
            const wb = window.workbox;

            [
                'waiting',
                'installed',
                'controlling',
                'activated',
                'redundant',
                'externalwaiting',
                'externalinstalled',
                'onupdatefound',
            ].forEach(type => {
                wb.addEventListener(type, logEvent);
            });

            [
                'install',
                'fetch'
            ].forEach(type => {
                wb.addEventListener(type, (event) => {
                    if (e.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
                        logEvent({type: `${event} mutes Chromium bug`});
                        return;
                    }
                })
            })

            // Prompt user for App Update
            const refreshAppPrompt = (event) => {
                console.log('should show prompt now');
                logEvent(event);

                if (confirm('A new version is available, update ?')) {
                    [
                        'controllerchange',
                        'controlling',
                    ].forEach(type => {
                        wb.addEventListener(type, (evt) => {
                            logEvent(evt);
                            console.log('reloading app...');
                            window.location.reload();
                        });
                    });

                    console.log('Instruct SW to activate immediately');
                    wb.messageSW({type: 'SKIP_WAITING'});
                } else {
                    console.log('User rejected update for now');
                }
            };

            wb.register()
                .then(registration => {
                    setReg(registration);
                    registration.addEventListener('updatefound', (e) => {
                        console.log('An update has been found!');
                        logEvent(e);
                        const newSW = registration.installing;
                        if (newSW) {
                            newSW.addEventListener('statechange', (evt) => {
                                let refreshing = false;
                                if (evt.target && evt.target.state === 'installed') {
                                    if (! refreshing) {
                                        if (confirm('A new version is available, update ?')) {
                                            refreshing = true;
                                            console.log('reloading app...');
                                            window.location.reload();
                                        } else {
                                            console.log('User rejected update for now');
                                        }
                                    } else {
                                        return;
                                    }
                                }
                            });
                            newSW.addEventListener('message', (evt) => {
                                console.log('msg @ new SW', evt);
                                logEvent(evt);
                            })
                        } else {
                            console.log('no new SW')
                        }
                    });
                    console.log('SW registered')
                    logEvent({type: 'registration' + new Date()});
                });
        }
    }, []);

    return (
        <div className={styles.swEventList}>
            <span style={{color: isOnline ? 'green' : 'red'}}>{isOnline ? 'online' : 'offline'}</span>
            {events.map(event => (
                <div className={styles.swEvent}>{event}</div>
            ))}
        </div>
    );
};

export default ServiceWorkerStatus;
