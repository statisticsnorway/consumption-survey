import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts';
import Loader from '../common/Loader';

export default (props) => {
    const router = useRouter();
    const {isAuthenticated, isLoggingIn} = useContext(UserContext);

    useEffect(() => {
        if (!isAuthenticated && router.pathname !== '/login') {
            router.push('/login');
        }
    }, [isLoggingIn, isAuthenticated, router.pathname]);

    if (isAuthenticated || (router.pathname === '/login')) {
        return props.children;
    } else {
        return <Loader/>;
    }
};
