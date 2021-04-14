import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts';
import Loader from '../common/Loader';
import PouchDBProvider from '../../pouchdb/PouchDBProvider';

const EXCLUDE_AUTH = [
    '/',
    '/login',
    '/idp-success',
    '/welcome',
    '/support/onboarding'
];

export default (props) => {
    const router = useRouter();
    const {isAuthenticated, isLoggingIn} = useContext(UserContext);

    useEffect(() => {
        console.log('isAuthenticated', isAuthenticated);
        console.log('path', router.pathname);
        console.log('check2', !EXCLUDE_AUTH.includes(router.pathname));
        console.log('final', (!isAuthenticated && (!EXCLUDE_AUTH.includes(router.pathname))));
        if (!isAuthenticated && (!EXCLUDE_AUTH.includes(router.pathname))) {
            router.push('/auth');
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
