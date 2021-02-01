import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Aperture } from 'react-feather';

import styles from './camera.module.scss';
import { isMobile, withOrientationChange } from 'react-device-detect';
import useWindowSize, { Orientation } from '../../../hocs/useWindowSize';
import Loader from '../Loader';

export enum CaptureMode {
    PHOTO = 'photo',
    VIDEO = 'video',
};

export enum Direction {
    FRONT = 'user',
    BACK = 'environment',
};

export enum CaptureFormat {
    JPEG = 'image/jpeg',
    PNG = 'image/png'
};

export type ImageData = string;

export type CameraProps = {
    mode?: CaptureMode;
    direction?: Direction;
    withAudio?: boolean;
    format?: CaptureFormat;
    onImageCapture: (imageData: ImageData) => void;
    onError: (err: string) => void;
    className?: string;
    isLandscape: boolean,
    isPortrait: boolean,
};

const Camera = ({
                    onImageCapture,
                    onError,
                    format = CaptureFormat.PNG,
                    className = '',
                    isLandscape, isPortrait,
                }: CameraProps) => {
    const camRef = useRef(null);
    const {size, orientation} = useWindowSize();
    const [aspectRatio, setAspectRatio] = useState<number>();

    useEffect(() => {
        if (size) {
            setAspectRatio(isPortrait ? (size.height / size.width) : (size.width / size.height));
        }
    }, [size, orientation]);

    const videoConstraints = {
        facingMode: isMobile ? Direction.BACK : Direction.FRONT
    };

    const capture = useCallback(
        () => {
            const objectUrl = camRef.current.getScreenshot();
            if (objectUrl) {
                const [, image] = objectUrl.split('base64,');
                console.log('image captured', image);
                onImageCapture(image);
            }
        },
        [camRef]
    );

    console.log('size, orientation and aspectRatio', size, orientation, aspectRatio);
    const verticalFix = (isMobile && orientation === Orientation.PORTRAIT) ? styles.vertical : '';

    return (size && aspectRatio) ? (
        <>
            <span>isMobile {isMobile ? 'true' : 'false'}</span>
            <div className={`${styles.camera} ${className}`}>
                <Webcam
                    ref={camRef}
                    screenshotFormat={format}
                    audio={false}
                    videoConstraints={{...videoConstraints, aspectRatio}}
                    className={`${styles.scene}`}
                    onUserMediaError={onError}
                />
            </div>
            <button
                className={`ssb-btn secondary-btn ${styles.shutterButton}`}
                onClick={capture}
            >
                <Aperture width={20} height={20}/>
            </button>
            <span className={styles.screenInfo}>
                {JSON.stringify(size)}, {orientation}, {aspectRatio}
            </span>
        </>
    ) : (
        <>
            <Loader/>
            Waiting device params...
        </>
    );
};

export default withOrientationChange(Camera);
