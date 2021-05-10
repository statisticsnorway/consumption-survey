import Loader from '../components/common/Loader';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATHS } from '../uiConfig';

const Offline = () => {
    const router = useRouter();
    useEffect(() => {
        router.push(PATHS.HOME);
    }, []);

    return <Loader />
};

export default Offline;
