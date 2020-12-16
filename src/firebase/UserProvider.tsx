import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { FireContext, UserContext } from '../contexts';
import { i18n } from '../../i18n';

export enum CommunicationPreference {
    EMAIL = 'EMAIL',
    IN_APP = 'IN-APP',
    SMS = 'SMS',
    PHONE = 'PHONE',
};

export type UserPreferences = {
    language: string;
    communicationPreferences: CommunicationPreference[];
    pin: string;
}

const UserProvider = ({children}) => {
    const { auth, firestore } = useContext(FireContext);
    const [userInfo, setUserInfo] = useState(null);
    const [userPreferences, setUserPreferences] = useState<UserPreferences>(null);
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

                        firestore.doc(`/users/${authInfo.userInfo.id}/profile/about`)
                            .set(authInfo.userInfo);
                    })
            } else {
                console.log('Response without token!');
            }
        } else {
            throw new Error(JSON.stringify(res));
        }

        setIsLoggingIn(false)
    };

    useEffect(() => {
        if (auth) {
            auth.onAuthStateChanged((user) => {
                console.log('[Auth] current user',
                    user.uid,
                    user.getIdToken(),
                    user.refreshToken);

                setIsLoggingIn(true);

                firestore
                    .doc(`/users/${user.uid}/profile/about`)
                    .onSnapshot((snapshot) => {
                        setUserInfo({
                            ...snapshot.data(),
                            userName: user.uid,
                        });
                        setIsLoggingIn(false);
                    });

                firestore
                    .doc(`/users/${user.uid}/profile/preferences`)
                    .onSnapshot(snapshot => {
                        setUserPreferences(snapshot.data() as UserPreferences);
                    })

            });
        }
    }, [auth]);

    useEffect(() => {
        if (userPreferences) {
            i18n.changeLanguage(userPreferences.language)
                .then((res) => {
                    console.log('User language changed', res);
                });
        }
    }, [userPreferences]);

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

