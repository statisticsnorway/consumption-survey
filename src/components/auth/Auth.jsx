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

    if (!validateToken(token)) {
        setToken(null);
        setIsAuthenticated(false);

        router.push('/pages/auth/login');
        return <p>Redirecting to login page...</p>;
    } else {
        const authContext = {
            token, isAuthenticated,
            setToken, setIsAuthenticated,
        };

        return (
            <AuthContext.Provider value={authContext}>
                {children}
            </AuthContext.Provider>
        );
    }
};

export default Auth;
