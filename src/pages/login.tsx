import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useContext, useEffect } from 'react';
import Loader from '../components/common/Loader';
import { UserContext } from '../contexts';

const appConfig = getConfig();

const Login = () => {
    const router = useRouter();

    const getLoginUrl = () => {
        const {envVars} = appConfig.publicRuntimeConfig;
        const {NEXT_PUBLIC_APP_NAME, NEXT_PUBLIC_AUTH_URL, NEXT_PUBLIC_AUTH_LOGIN_PATH} = envVars;
        return `${NEXT_PUBLIC_AUTH_URL}${NEXT_PUBLIC_AUTH_LOGIN_PATH}/${NEXT_PUBLIC_APP_NAME}`;
    };

    useEffect(() => {
        router.push(getLoginUrl());
    }, []);

    return <Loader/>;
};

Login.getInitialProps = () => ({});

export default Login;
