import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserContext, UserInfoType } from '../components/common/contexts';

const INIT_STATE = {
    token: null,
    userInfo: null,
    expiresAt: null,
};

const UserProvider = ({ children }) => {
    const router = useRouter();
    const [authState, setAuthState] = useState(INIT_STATE);

    useEffect(() => {
        if (!authState.token) {
            router.push('/login');
        }
    }, []);

    const setAuthInfo = (token: string, userInfo: UserInfoType, expiresAt: Date):void => {
        setAuthState({
            token,
            userInfo,
            expiresAt
        });
    };

    const logout = () => {
        setAuthState(INIT_STATE);
    }

    // TODO: include expiresAt check
    const isLoggedIn = () => authState.token !== null;

    return (
        <UserContext.Provider value={{
            ...authState,
            setAuthInfo,
            logout,
            isLoggedIn
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
