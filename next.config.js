const withPlugins = require('next-compose-plugins');
const withStyles = require('@webdeb/next-styles');
const withSourceMaps = require('@zeit/next-source-maps');
// const withOffline = require('next-offline');
const withPWA = require('next-pwa');

const offlineOpts = {
    workboxOpts: {
        swDest: '../public/service-worker.js',
        runtimeCaching: [
            {
                urlPattern: /^https?.*/,
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
    [withPWA, { pwa: { dest: 'public' }}]
]);
