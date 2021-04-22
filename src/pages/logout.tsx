import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useContext, useEffect } from 'react';
import Loader from '../components/common/Loader';
import { UserContext } from '../contexts';

const appConfig = getConfig();

const Logout = () => {
    const router = useRouter();
    const { logout } = useContext(UserContext);

    const getLogoutUrl = () => {
        const {envVars} = appConfig.publicRuntimeConfig;
        const {NEXT_PUBLIC_AUTH_URL, NEXT_PUBLIC_AUTH_LOGOUT_PATH} = envVars;
        return `${NEXT_PUBLIC_AUTH_URL}${NEXT_PUBLIC_AUTH_LOGOUT_PATH}`;
    };

    useEffect(() => {
        const doLogout = async () => {
            await logout();
            console.log('trying idporten logout now', getLogoutUrl());
            router.push(getLogoutUrl());
        };

        doLogout();
    }, []);

    return <Loader />;
};

Logout.getInitialProps = () => ({});

export default Logout;
