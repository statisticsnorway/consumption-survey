import { useEffect, useState } from 'react';

export type WindowSize = {
    height: number;
    width: number;
};

export enum Orientation {
    LANDSCAPE = 'landscape',
    PORTRAIT = 'portrait',
};

const useWindowSize = () => {
    const [size, setSize] = useState<WindowSize>();
    const [orientation, setOrientation] = useState<Orientation>();

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (size) {
            if (window.matchMedia("(orientation: portrait)").matches) {
                setOrientation(Orientation.PORTRAIT);
            }
        }
    }, [size]);

    return {size, orientation};
};

export default useWindowSize;
