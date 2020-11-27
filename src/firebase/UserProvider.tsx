import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { FireContext, UserContext } from '../contexts';

const UserProvider = ({children}) => {
    const { auth } = useContext(FireContext);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const login = async (userName) => {
        setIsLoggingIn(true);
        const res = await axios.post('/bff/login', {
            user: userName
        });

        if ((res.status >= 200) && (res.status < 300)) {
            const {data: authInfo} = res;

            if (authInfo && authInfo.firebaseToken && authInfo.userInfo) {
                auth.signInWithCustomToken(authInfo.firebaseToken)
                    .then((user) => {
                        console.log('Successfully logged in as', user);
                        setUserInfo({
                            ...authInfo.userInfo,
                            userName: authInfo.userInfo.id,
                        });
                    })
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

