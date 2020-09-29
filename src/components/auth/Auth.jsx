import { createContext, useState } from 'react';
import { useRouter } from 'next/router';
import { differenceInMinutes } from 'date-fns';
import Pin from './Pin';

export const THREE_MINUTES = 3;

export const AuthContext = createContext({});

// TODO: Replace this when we have IDPorten ready
const validateToken = (token) => true;

const Auth = ({children}) => {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [lastPinActive, setLastPinActive] = useState(null);

    if (!validateToken(token)) {
        setToken(null);
        setIsAuthenticated(false);
        setLastPinActive(null);

        router.push('/pages/auth/login');
        return <p>Redirecting to login page...</p>;
    } else {
        const now = new Date();
        const diff = differenceInMinutes(now, lastPinActive);

        console.log('lastPin @', lastPinActive, diff);

        if (lastPinActive && (diff <= THREE_MINUTES)) {
            const authContext = {
                token, isAuthenticated, lastPinActive,
                setToken, setIsAuthenticated, setLastPinActive,
            };

            return (
                <AuthContext.Provider value={authContext}>
                    {children}
                </AuthContext.Provider>
            );
        } else {
            return (
                <Pin onValidPin={() => {
                    setIsAuthenticated(true);
                    setLastPinActive(new Date());
                }}/>
            );
        }
    }
};

export default Auth;
