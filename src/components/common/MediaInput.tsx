import { RefObject, useEffect, useState } from 'react';

export type MediaInputProps = {
    inputRef: RefObject<HTMLInputElement>;
    handleFileSelect: (imageName: string, imageBlob: Blob) => void;
    accept?: string;
    launchCamera?: boolean;
};

const MediaInput = ({ inputRef, handleFileSelect, launchCamera = true, accept = 'image/*;capture=camera'}: MediaInputProps) => {
    useEffect(() => {
        console.log('MI porps', launchCamera, inputRef, inputRef?.current)
        if (launchCamera && inputRef && inputRef.current) {
            inputRef.current.click();
        }
    }, [launchCamera]);

    const onChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const image = e.target.files[0];
            handleFileSelect(image.name, image);
        }
    };

    return (
        <input
            id="receiptUpload"
            ref={inputRef}
            type="file"
            accept={accept}
            style={{display: 'none'}}
            onChange={onChange}
        />
    );
};

export default MediaInput;
