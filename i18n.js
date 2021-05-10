const NextI18Next = require('next-i18next').default
const {localeSubpaths} = require('next/config').default().publicRuntimeConfig
const path = require('path')

module.exports = new NextI18Next({
    defaultLanguage: 'nb',
    otherLanguages: ['nb', 'nn', 'en'],
    fallbackLng: 'nb',
    serverLanguageDetection: false,
    browserLanguageDetection: true,
    detection: {
        order: ['cookie', 'localStorage'],
        caches: ['cookie', 'localStorage']
    },
    react: {
        bindI18n: 'languageChanged',
        useSuspense: false
    },
    localeSubpaths,
    localePath: path.resolve('./public/static/locales'),
    strictMode: false
});
