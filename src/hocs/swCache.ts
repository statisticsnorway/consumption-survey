export const APP_CACHE_NAME = 'fbu-app-cache';
export const APP_GLOBALS = '/fbu-app-globals';

export type CACHE_SAVE_FN = (
    key: string,
    value: string,
    append?: boolean,
    cacheEndPoint?: string
) => Promise<string>;

export type CACHE_FETCH_FN = (
    key?: string | undefined,
    cacheEndPoint?: string
) => Promise<string | null | undefined | {}>;

export const saveToCache:CACHE_SAVE_FN = async (key, value, append = true, cacheEndpoint = APP_GLOBALS) => {
    if (key && value) {
        try {
            const cache = await caches.open(APP_CACHE_NAME);
            const cacheRes = await cache.match(cacheEndpoint);
            const curr = cacheRes ? await cacheRes.json() : {};

            const body = JSON.stringify({
                ...curr,
                [key]: value,
            });

            console.log('Cache should have', body);
            const response = new Response(body);
            await cache.put(cacheEndpoint, response);
            return value;
        } catch (e) {
            console.log('could not save to cache !', e);
        }
    } else {
        throw new Error('Both [key] and [value] are mandatory for saveCache');
    }
};

// if @param key is empty, return the whole cache
export const getFromCache:CACHE_FETCH_FN = async (key = undefined, cacheEndpoint = APP_GLOBALS) => {
    try {
        const cache = await caches.open(APP_CACHE_NAME);
        const res = await cache.match(cacheEndpoint);

        if (!res) {
            // return undefined if lookup was for a specific item
            return key ? undefined : {};
        }

        const globals = await res.json();
        return key ? globals[key] : globals;
    } catch (e) {
        console.log('Could not fetch app cache', e);
    }
};

