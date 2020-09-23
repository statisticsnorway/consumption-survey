const withPlugins = require('next-compose-plugins');
const withStyles = require('@webdeb/next-styles');
const withSourceMaps = require('@zeit/next-source-maps');
// const withOffline = require('next-offline');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/*
const offlineOpts = {
    workboxOpts: {
        swDest: '../public/service-worker.js',
        runtimeCaching: [
            {
                urlPattern: /^https?.* /,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'offlineCache',
                    expiration: {
                        maxEntries: 20,
                        maxAgeSeconds: 2 * 24 * 60 * 60, // 2 days
                    },
                    cacheableResponse: {
                        statuses: [0, 200]
                    }
                }
            }
        ]
    }
};
*/

runtimeCaching[0].handler = 'CacheFirst';
const pwaOptions = {
    pwa: {
        dest: 'public',
        register: false,            // we will be registering our own SW
        skipWaiting: false,         // we will register SW as soon as it is installed
        runtimeCaching 
    }
};

module.exports = withPlugins([
    [withStyles, {
        sass: true,
        modules: true,
        miniCssExtractOptions: {ignoreOrder: true}
    }],
    [withSourceMaps, {
        webpack(config, options) {
            return config
        }
    }],
    [withPWA, pwaOptions]
]);
