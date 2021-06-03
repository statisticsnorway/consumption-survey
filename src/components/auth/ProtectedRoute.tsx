import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts';
import Loader from '../common/Loader';
// import PouchDBProvider from '../../pouchdb/PouchDBProvider';
import getConfig from 'next/config';
import PouchDBProvider from '../../pouchdb/PouchDBProvider';
import usePreferences from '../../hocs/usePreferences';
import { PATHS } from '../../uiConfig';

const appConfig = getConfig();

const EXCLUDE_AUTH = [
    '/',
    '/login',
    '/logout',
    '/idp-success',
    '/idp-logout',
    '/welcome',
    '/support/onboarding'
];

const ProtectedRoute = (props) => {
    const router = useRouter();
    const {isAuthenticated, isLoggingIn, isLoggingOut} = useContext(UserContext);
    const {getPreference} = usePreferences();
    const {envVars} = appConfig.publicRuntimeConfig;

    const getAuthUrl = () => {
        const {NEXT_PUBLIC_APP_NAME, NEXT_PUBLIC_AUTH_URL, NEXT_PUBLIC_AUTH_LOGIN_PATH} = envVars;
        return `${NEXT_PUBLIC_AUTH_URL}${NEXT_PUBLIC_AUTH_LOGIN_PATH}/${NEXT_PUBLIC_APP_NAME}`;
    };

    useEffect(() => {
        // console.log('isAuthenticated', isAuthenticated);
        // console.log('path', router.pathname);
        // console.log('check2', !EXCLUDE_AUTH.includes(router.pathname));
        // console.log('final', (!isAuthenticated && (!EXCLUDE_AUTH.includes(router.pathname))));
        if (!isAuthenticated && !isLoggingOut && (!EXCLUDE_AUTH.includes(router.pathname))) {
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
    }, [isLoggingIn, isLoggingOut, isAuthenticated, router.pathname]);

    if (isAuthenticated && !isLoggingOut) {
        return (
            <PouchDBProvider>
                {props.children}
            </PouchDBProvider>
        );
    } else if (EXCLUDE_AUTH.includes(router.pathname)) {
        const showOnboarding = getPreference('showOnboarding');
        if (Boolean(showOnboarding)) {
            router.push(PATHS.ONBOARDING);
        } else {
            console.log('skipping onboarding slides');
        }

        return props.children;
    } else {
        return <Loader/>;
    }
};

ProtectedRoute.getInitialProps = () => ({});

export default ProtectedRoute;
