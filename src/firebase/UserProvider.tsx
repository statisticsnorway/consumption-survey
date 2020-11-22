import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserContext, FireContext } from '../contexts';
import Loader from '../components/common/Loader';
import { useRouter } from 'next/router';

export const useAuth = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(true);

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token');
            if (token) {
                console.log('Found token in cookies..', token);
                // TODO: load profile info from `/profile` endpoint
                /*
                api.defaults.headers.Authorization = `Beader ${token}`;
                const { data } = await api.get('/profile');
                if (data) {
                    setUserInfo(data);
                }
                */
            }

            setIsLoggingIn(false);
        }

        loadUserFromCookies();
    }, []);

    const login = async (userName) => {
        const { data: authInfo } = await axios.post('/bff/login', {
            user: userName
        });

        if (authInfo) {
            console.log('response', authInfo);
            if (authInfo.firebaseToken) {
                Cookies.set('token', authInfo.token, { expires: 60, secure: true });
                setUserInfo(authInfo.userInfo);
            } else {
                console.log('Response without token!');
            }
        }
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

export const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const { isAuthenticated, isLoggingIn } = useContext(UserContext);

    useEffect(() => {
        if (!isAuthenticated && router.pathname !== '/login') {
            router.push('/login');
        }
    }, [isLoggingIn, isAuthenticated, router.pathname]);

    if (isAuthenticated || (router.pathname === '/login')) {
        return children;
    } else {
        return <Loader />;
    }
};
