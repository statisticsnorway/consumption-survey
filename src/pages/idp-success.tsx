import { useRouter } from 'next/router';
import axios from 'axios';
import { ReactNode, useContext, useEffect, useState } from 'react';
import getConfig from 'next/config';
import { RespondentDetails, UserContext } from '../contexts';
import UserCard from '../components/user/UserCard';
import Loader from '../components/common/Loader';
import { DASHBOARD_TABS, PATHS } from '../uiConfig';

const appConfig = getConfig();

const IDPSuccess = () => {
    const router = useRouter();
    const {state, code} = router.query;

    const {login, loginLogoutErrors, isAuthenticated, isLoggingIn, userInfo, respondentDetails} = useContext(UserContext);
    const [idPortenInfo, setIdPortenInfo] = useState<object>(null);
    const [respondentInfo, setRespondentInfo] = useState<RespondentDetails>(null);
    const [idPortenError, setIdPortenError] = useState<Error>(null);

    console.log('IDP success');

    const getAuthTokenEndpoint = () => {
        const {envVars} = appConfig.publicRuntimeConfig;
        const authUrl = envVars.NEXT_PUBLIC_AUTH_URL;
        const tokenEP = envVars.NEXT_PUBLIC_AUTH_TOKEN_ENDPOINT;

        return `${authUrl}${tokenEP}`;
    };

    useEffect(() => {
        if (state && code && !isAuthenticated) {
            const tokenUrl = `${getAuthTokenEndpoint()}?state=${state as string}&code=${code as string}`;
            console.log(`Trying to fetch token from`, tokenUrl);

            axios.get(tokenUrl, {withCredentials: true})
                .then(res => {
                    const {accessToken, refreshToken, idToken, idTokenUserInfo} = res.data;
                    const {claims} = idToken;
                    setIdPortenInfo({accessToken, refreshToken, idToken, idTokenUserInfo});
                    setRespondentInfo(claims);
                })
                .catch(err => {
                    setIdPortenError(err);
                })
        } else {
            setIdPortenError(new Error('Empty state|code from auth-idporten'));
        }
    }, []);

    useEffect(() => {
        if (respondentInfo) {
            login(respondentInfo, idPortenInfo)
                .then(() => {
                    console.log('Firebase token obtained!');
                })
                .catch((err) => {
                    console.log('error obtaining firebase token', err);
                });
        }
    }, [respondentInfo]);

    useEffect(() => {
        if (isAuthenticated && respondentDetails) {
            router.push(`${PATHS.PURCHASES}`);
        }
    }, [isAuthenticated, respondentDetails]);

    const traceInfo = false ? (
        <>
            <h3>IDPorten :: BFF </h3>
            <p>isAuthenticated: {isAuthenticated}</p>
            <p>idpInfo: {JSON.stringify(respondentInfo)}</p>
            <p>details: {JSON.stringify(respondentDetails)}</p>
            {idPortenError && <p>IDP Errors: {JSON.stringify(idPortenError)}</p>}
            {loginLogoutErrors && <p>Firebase Auth Errors: {loginLogoutErrors}</p>}
        </>
    ) : null;

    return (
        <>
            {traceInfo}
            {(!isAuthenticated || isLoggingIn) && <Loader/>}
            {isAuthenticated && respondentInfo && !respondentDetails &&
            <p>
                IDPorten innlogging vellykket, men vi kunne ikke finne
                survey info (respondentId, føringsperiode) fra auth/backend
                moduler.
            </p>
            }
            {isAuthenticated && respondentDetails && <UserCard details={respondentDetails}/>}
        </>
    );
};


IDPSuccess.getInitialProps = () => {
    return {};
};

export default IDPSuccess;
