import { useRouter } from 'next/router';
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import UserCard from '../components/user/UserCard';
import getConfig from 'next/config';

const appConfig = getConfig();

const IDPSuccess = () => {
    const router = useRouter();
    const {state, code} = router.query;

    const [comp, setComp] = useState<ReactNode>(null);

    console.log('IDP success');

    const getAuthTokenEndpoint = () => {
        const {envVars} = appConfig.publicRuntimeConfig;
        const authUrl = envVars.NEXT_PUBLIC_AUTH_URL;
        const tokenEP = envVars.NEXT_PUBLIC_AUTH_TOKEN_ENDPOINT;

        return `${authUrl}${tokenEP}`;
    };

    useEffect(() => {
        if (state && code) {
            /* router.push(`/auth/login/oauth2/code/?state=${state}&code=${code}`); */
            console.log('Trying to fetch tokens from code & state');

            const tokenUrl = `${getAuthTokenEndpoint()}?state=${state as string}&code=${code as string}`;
            console.log(`Trying to fetch token from`, tokenUrl);

            axios.get(tokenUrl, { withCredentials: true })
                .then(res => {
                    const {accessToken, refreshToken, idToken, idTokenUserInfo} = res.data;
                    const { claims: userDetails } = idToken;
                    setComp(
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <UserCard details={userDetails} />
                        </div>
                    );
                })
                .catch(err => {
                    console.log('could not fetch tokens', err);
                    setComp(<p>{JSON.stringify(err)}</p>);
                })

        } else {
            setComp(
                <div style={{background: '#fcc', color: 'red'}}>
                    <p>State | Code empty</p>
                </div>
            );
        }
    }, []);

    return (
        <>
            <p>IDP Success</p>
            {comp}
        </>
    );
};

IDPSuccess.getInitialProps = () => {
    return {};
};

export default IDPSuccess;
