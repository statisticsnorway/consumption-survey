'use strict';

self.addEventListener('message', async (event) => {
    console.log('Received message ', event);
    if (event.data && event.data.action === 'SKIP_WAITING') {
        console.log('SW should update now!');
        self.skipWaiting();
    }
});
