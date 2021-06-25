import { useRouter } from 'next/router';
import axios from 'axios';
import { ReactNode, useContext, useEffect, useState } from 'react';
import getConfig from 'next/config';
import { IDPortenTokenInfo, RespondentDetails, UserContext } from '../contexts';
import UserCard from '../components/user/UserCard';
import Loader from '../components/common/Loader';
import { PATHS } from '../uiConfig';
import Workspace from '../components/layout/workspace/Workspace';
import { useTranslation } from 'react-i18next';
import style from '../components/menu/menu.module.scss';

const appConfig = getConfig();

const IDPSuccess = () => {
    const {t} = useTranslation('common');
    const router = useRouter();
    const {state, code} = router.query;

    const {login, loginLogoutErrors, isAuthenticated, isLoggingIn, userInfo, respondentDetails} = useContext(UserContext);
    const [idPortenInfo, setIdPortenInfo] = useState<IDPortenTokenInfo>(null);
    const [respondentInfo, setRespondentInfo] = useState<RespondentDetails>(null);
    const [idPortenError, setIdPortenError] = useState<Error>(null);
    const [fbuError, setFbuError] = useState<string>(null);

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
        if (respondentInfo && idPortenInfo) {
            if (respondentInfo.respondentId) {
                console.log('[IDP-S] trying to fetch fb token', respondentInfo, idPortenInfo);
                login(respondentInfo, idPortenInfo)
                    .then(() => {
                        console.log('Firebase token obtained!');
                    })
                    .catch((err) => {
                        console.log('error obtaining firebase token', err);
                    });
            } else {
                console.log('[IDP-S] No respondent info');
                setFbuError(t('noRespondentInfo'));
            }
        }
    }, [respondentInfo, idPortenInfo]);

    useEffect(() => {
        if (isAuthenticated && userInfo) {
            router.push(PATHS.HOME);
        }
    }, [isAuthenticated, userInfo]);

    const traceInfo = false ? (
        <>
            <h3>IDPorten :: BFF </h3>
            <p>isAuthenticated: {isAuthenticated}</p>
            <p>idpInfo: {JSON.stringify(respondentInfo)}</p>
            <p>details: {JSON.stringify(userInfo)}</p>
            {idPortenError && <p>IDP Errors: {JSON.stringify(idPortenError)}</p>}
            {loginLogoutErrors && <p>Firebase Auth Errors: {loginLogoutErrors}</p>}
        </>
    ) : null;

    return (
        <Workspace showFooter={false}>
            {traceInfo}
            {(!isAuthenticated && isLoggingIn) && <Loader/>}
            {fbuError &&
            <div style={{ background: '#fcc', padding: '1rem', margin: '1rem 0', display: 'flex' }}>
                <p>{fbuError}</p>
                <button
                    onClick={() => {
                        router.push(PATHS.LOGOUT)
                    }}
                    className={`ssb-btn primary-btn`}>
                    Logg ut
                </button>
            </div>
            }
            {loginLogoutErrors &&
            <div style={{ background: '#fcc', padding: '1rem', margin: '1rem 0', display: 'flex' }}>
                <p>{JSON.stringify(loginLogoutErrors)}</p>
                <button
                    onClick={() => {
                        router.push(PATHS.LOGOUT)
                    }}
                    className={`ssb-btn primary-btn`}>
                    Logg ut
                </button>
            </div>
            }
            {isAuthenticated && !userInfo &&
            <p>
                IDPorten innlogging vellykket, men vi kunne ikke finne hente
                survey info (respondentId, føringsperiode) fra auth/backend
                moduler.
            </p>
            }
            {isAuthenticated && userInfo && userInfo.respondentDetails && <UserCard details={userInfo.respondentDetails}/>}
        </Workspace>
    );
};


IDPSuccess.getInitialProps = () => {
    return {};
};

export default IDPSuccess;
