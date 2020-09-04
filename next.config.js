const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withStyles = require('@webdeb/next-styles');
const withSourceMaps = require('@zeit/next-source-maps');

module.exports = withPWA({
    pwa: {
        dest: 'public'
    }
});

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
    [withPWA, {pwa: {dest: 'public'}}]
]);
