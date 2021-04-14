import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts';
import Loader from '../common/Loader';
import PouchDBProvider from '../../pouchdb/PouchDBProvider';
import getConfig from 'next/config';

const appConfig = getConfig();

const EXCLUDE_AUTH = [
    '/',
    '/login',
    '/idp-success',
    '/welcome',
    '/support/onboarding'
];

const ProtectedRoute = (props) => {
    const router = useRouter();
    const {isAuthenticated, isLoggingIn} = useContext(UserContext);

    const getAuthUrl = () => {
        const {envVars} = appConfig.publicRuntimeConfig;
        return envVars.NEXT_PUBLIC_AUTH_URL;
    };

    useEffect(() => {
        console.log('isAuthenticated', isAuthenticated);
        console.log('path', router.pathname);
        console.log('check2', !EXCLUDE_AUTH.includes(router.pathname));
        console.log('final', (!isAuthenticated && (!EXCLUDE_AUTH.includes(router.pathname))));
        if (!isAuthenticated && (!EXCLUDE_AUTH.includes(router.pathname))) {
            console.log('Auth url', getAuthUrl());
            router.push(getAuthUrl());
        } else {
            /*
            if (router.pathname === '/') {
                const { code, state } = router.query;
                if (code && state) {
                    router.push(`/idp-success?code=${code}&state=${state}`);
                }
            }

             */
        }
    }, [isLoggingIn, isAuthenticated, router.pathname]);

    if (isAuthenticated) {
        return (
            <PouchDBProvider>
                {props.children}
            </PouchDBProvider>
        );
    } else if (EXCLUDE_AUTH.includes(router.pathname)) {
        return props.children;
    } else {
        return <Loader/>;
    }
};

ProtectedRoute.getInitialProps = () => {
    return {};
};

export default ProtectedRoute;

