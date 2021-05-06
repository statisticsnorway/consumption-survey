import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useContext, useEffect } from 'react';
import Loader from '../components/common/Loader';

const appConfig = getConfig();

const Logout = () => {
    const router = useRouter();

    const getLogoutUrl = () => {
        const {envVars} = appConfig.publicRuntimeConfig;
        const {NEXT_PUBLIC_AUTH_URL, NEXT_PUBLIC_AUTH_LOGOUT_PATH} = envVars;
        return `${NEXT_PUBLIC_AUTH_URL}${NEXT_PUBLIC_AUTH_LOGOUT_PATH}`;
    };

    useEffect(() => {
        const doIdportenLogout = async () => {
            window.location.href = "https://fbu.ssb.no/auth/logout"     //TODO Must be done dynamically
        };

        doIdportenLogout();
    }, []);

    return <Loader />;
};

Logout.getInitialProps = () => ({});

export default Logout;
