const withPlugins = require('next-compose-plugins');
const withStyles = require('@webdeb/next-styles');
const withSourceMaps = require('@zeit/next-source-maps');
// const withOffline = require('next-offline');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {};

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

const extractEnvVars = (vars, prefix) =>
  Object.keys(vars)
      .filter(name => name.startsWith(prefix))
      .reduce((acc, name) => ({
          ...acc,
          [name]: vars[name]
      }), {});

runtimeCaching[0].handler = 'CacheFirst';
const nextConfig = {
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    pwa: {
        dest: 'public',
        register: false,            // we will be registering our own SW
        skipWaiting: false,         // we will register SW as soon as it is installed
        runtimeCaching
    },
    serverRuntimeConfig: {
        serverEnvVars: extractEnvVars(process.env, 'FORBRUK_SERVER_VAR_')
    },
    publicRuntimeConfig: {
        localeSubpaths,
        envVars: extractEnvVars(process.env, 'FORBRUK_APP_VAR_')
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
    [withPWA, nextConfig]
]);
