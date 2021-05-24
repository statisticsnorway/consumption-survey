import { useEffect, useState } from 'react';
import BarLoader from 'react-spinners/BarLoader';

const Loader = ({show = true, width = '25%', styleClass = ''}) => {
    const [showLoader, setShowLoader] = useState(show);

    useEffect(() => {
        setShowLoader(show);
    }, [show]);

    return (
        <BarLoader
            loading={showLoader}
            color={'#1A9D49'}
            height={'0.5rem'}
            width={width}
            className={styleClass}
        />
    );
};

export default Loader;
