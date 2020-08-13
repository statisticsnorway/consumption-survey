if (typeof window !== 'undefined') {
    const __tess = window ? require('tesseract.js/dist/tesseract.min') : require('tesseract.js');
    exports.Tesseract = __tess;
}
