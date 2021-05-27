'use strict';

self.addEventListener('message', async (event) => {
    console.log('Received message ', event);

    if (event.data) {
        switch (event.data.action) {
            // update-now event
            case 'SKIP_WAITING': {
                console.log('SW should update now!');
                self.skipWaiting();
                return;
            }
            // nextjs handles front end nav without engaging the SW
            case 'CACHE_NEW_ROUTE': {
                const pageUrl = event.source.url;
                console.log('[SW] cache route request for', pageUrl);
                caches.open('others').then(cache =>
                    cache.match(pageUrl).then(res => {
                        if (res === undefined) {
                            console.log(`[SW] entry does not exist for ${pageUrl}.. caching`);
                            return cache.add(pageUrl)
                        } else {
                            console.log(`[SW] found a cache entry for ${pageUrl}.. skipping`);
                        }
                    }));
                return;
            }
        }
    }

    if (event.data && event.data.action === 'SKIP_WAITING') {
        console.log('SW should update now!');
        self.skipWaiting();
    }
});
