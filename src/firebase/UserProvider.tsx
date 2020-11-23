import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserContext, FireContext } from '../contexts';
import Loader from '../components/common/Loader';
import { useRouter } from 'next/router';

export const useAuth = () => useContext(UserContext);

const UserProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const login = async (userName) => {
        setIsLoggingIn(true);
        const res = await axios.post('/bff/login', {
            user: userName
        });

        if ((res.status >= 200) && (res.status < 300)) {
            const {data: authInfo} = res;

            if (authInfo && authInfo.userInfo) {
                setUserInfo(authInfo.userInfo);
            } else {
                console.log('Response without token!');
            }
        } else {
            throw new Error(JSON.stringify(res));
        }

        setIsLoggingIn(false)
    };

    const logout = () => {
        setUserInfo(null);
    };

    return (
        <UserContext.Provider
            value={{
                isAuthenticated: !!userInfo,
                userInfo,
                login,
                logout,
                isLoggingIn,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

export const ProtectedRoute = ({children}) => {
    const router = useRouter();
    const {isAuthenticated, isLoggingIn} = useContext(UserContext);

    useEffect(() => {
        if (!isAuthenticated && router.pathname !== '/login') {
            router.push('/login');
        }
    }, [isLoggingIn, isAuthenticated, router.pathname]);

    if (isAuthenticated || (router.pathname === '/login')) {
        return children;
    } else {
        return <Loader/>;
    }
};
