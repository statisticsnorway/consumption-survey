const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withStyles = require('@webdeb/next-styles');

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
    [withPWA, {pwa: {dest: 'public'}}],
]);
