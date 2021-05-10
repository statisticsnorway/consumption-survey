import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useEffect } from 'react';
import Loader from '../components/common/Loader';
import Workspace from '../components/layout/workspace/Workspace';

const appConfig = getConfig();

const Login = () => {
    const router = useRouter();
    const {envVars} = appConfig.publicRuntimeConfig;

    const getLoginUrl = () => {
        const {NEXT_PUBLIC_APP_NAME, NEXT_PUBLIC_AUTH_URL, NEXT_PUBLIC_AUTH_LOGIN_PATH} = envVars;
        return `${NEXT_PUBLIC_AUTH_URL}${NEXT_PUBLIC_AUTH_LOGIN_PATH}/${NEXT_PUBLIC_APP_NAME}`;
    };

    useEffect(() => {
        router.push(getLoginUrl());
    }, []);

    return (
        <Workspace showFooter={false}>
            <Loader/>
        </Workspace>
    );
};

Login.getInitialProps = () => ({});

export default Login;
