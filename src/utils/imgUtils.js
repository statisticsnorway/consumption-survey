export const mime = (type) => {
    switch (type) {
        case 'png': return 'image/png';
        case 'jpg':
        case 'jpeg': return 'image/jpeg';
        default:
            return `application/${type}`;
    }
}

export const getType = (fileName) =>
    fileName && fileName.substring(fileName.lastIndexOf('.') + 1);

export const getContentType = (fileName) => {
    return mime(getType(fileName));
};

export const base64ToBlob = (base64, contentType, chunkSize = 512) => {
    const byteChars = atob(base64);
    let byteArrays = [];

    for (let offset = 0; offset < byteChars.length; offset += chunkSize) {
        const chunk = byteChars.slice(offset, offset + chunkSize);

        const byteNum = new Array(chunk.length);
        for (let i = 0; i < chunk.length; i++) {
            byteNum[i] = chunk.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNum);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
};

