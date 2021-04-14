import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
// import { FireContext, UserContext } from '../contexts';
import { FireContext, SurveyInfo, UserContext, UserInfoType } from '../contexts';
import { i18n } from '../../i18n';
import { add, sub } from 'date-fns';
import { useRouter } from 'next/router';

export enum CommunicationPreference {
    EMAIL = 'EMAIL',
    IN_APP = 'IN-APP',
    SMS = 'SMS',
    PHONE = 'PHONE',
};

const LOGIN_URL = `${process.env.NEXT_PUBLIC_BFF_HOST}/login`;

export type UserPreferences = {
    language: string;
    communicationPreferences: CommunicationPreference[];
    pin: string;
}

const TODAY = new Date();

export const DUMMY_SURVEY_INFO: SurveyInfo = {
    journalStart: sub(TODAY, {days: 3}),
    journalEnd: add(TODAY, {days: 12}),
}

const UserProvider = ({children}) => {
    const router = useRouter();
    const {auth, firestore, reset} = useContext(FireContext);
    const [userInfo, setUserInfo] = useState<UserInfoType>(null);
    const [userPreferences, setUserPreferences] = useState<UserPreferences>(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loginLogoutErrors, setLoginLogoutErrors] = useState<any>(null);

    /*
    const login = async (userName) => {
        console.log('Mock loggin in user', userName);
        setIsLoggingIn(true);
        setUserPreferences({
            language: 'nb',
            communicationPreferences: [],
            pin: '1234',
        });

        setUserInfo({
            userName,
            email: `${userName}@ssb.no`,
            surveyInfo: DUMMY_SURVEY_INFO,
        });
    };

     */

    const login = async (userName) => {
        if (!auth) {
            console.log('firebase auth not ready ...');
            return;
        }

        if (!userName) {
            await router.push('/login');
        } else {
            setIsLoggingIn(true);
            const res = await axios.post(LOGIN_URL, {
                user: userName
            });

            if ((res.status >= 200) && (res.status < 300)) {
                const {data: authInfo} = res;

                if (authInfo && authInfo.firebaseToken && authInfo.userInfo) {
                    auth.signInWithCustomToken(authInfo.firebaseToken)
                        .then((user) => {
                            console.log('Successfully logged in as', user);
                            const loginInfo = {
                                ...authInfo.userInfo,
                                userName: authInfo.userInfo.id,
                                surveyInfo: DUMMY_SURVEY_INFO,
                            };

                            setUserInfo(loginInfo);

                            firestore.doc(`/users/${authInfo.userInfo.id}/profile/about`)
                                .set(loginInfo)
                                .then(res => {
                                    console.log('successfully updated userInfo', res);
                                })
                                .catch(err => {
                                    console.log(`could not update fb /profile/about for ${authInfo.userInfo.id}`);
                                    setLoginLogoutErrors(err);
                                })
                        })
                } else {
                    console.log('Response without token!');
                    setLoginLogoutErrors('No token in BFF response');
                }
            } else {
                setLoginLogoutErrors(res);
                setIsLoggingIn(false);
                throw new Error(JSON.stringify(res));
            }

            setIsLoggingIn(false);
        }
    };

    useEffect(() => {
        if (auth) {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    console.log('[Auth] current user',
                        user.uid,
                        user.getIdToken(),
                        user.refreshToken);

                    setIsLoggingIn(true);

                    try {
                        firestore
                            .doc(`/users/${user.uid}/profile/about`)
                            .onSnapshot((snapshot) => {
                                setUserInfo({
                                    ...(snapshot.data() as UserInfoType),
                                    userName: user.uid,
                                    surveyInfo: DUMMY_SURVEY_INFO,
                                });
                                setIsLoggingIn(false);
                            });

                        firestore
                            .doc(`/users/${user.uid}/profile/preferences`)
                            .onSnapshot(snapshot => {
                                setUserPreferences({
                                    ...snapshot.data(),
                                    language: 'nb',
                                } as UserPreferences);
                            }, (err) => {
                                console.log('could not get preferences', err);
                                setUserPreferences({
                                    language: 'nb',
                                } as UserPreferences);
                            })
                    } catch (err) {
                        console.log('Could not fetch user info/preferences');
                        setLoginLogoutErrors(err);
                    }
                } else {
                    console.log('User logged out ?');
                }
            });
        }
    }, [auth]);

    useEffect(() => {
        if (userPreferences) {
            console.log('user preferences change', userPreferences);
            i18n.changeLanguage(userPreferences.language)
                .then((res) => {
                    console.log('User language changed', res);
                });
        } else {
            console.log('awaiting user preferences..');
            i18n.changeLanguage('nb')
                .then((res) => {
                    console.log('initial language', res);
                })
        }
    }, [userPreferences]);

    useEffect(() => {
        setIsAuthenticated(!!userInfo);
    }, [userInfo]);


    const logout = async () => {
        if (auth && isAuthenticated) {
            setIsLoggingOut(true);
            auth.signOut()
                .then(async (res) => {
                    console.log('successfully signed out', res);
                    setUserInfo(null);
                    setIsLoggingIn(false);
                    setUserPreferences(null);
                    setIsLoggingOut(false);

                    try {
                        await reset();
                        await router.push('/login');
                        window.location.reload();
                    } catch (err) {
                        console.log('could not reset app', err);
                        setLoginLogoutErrors(err);
                    }


                })
                .catch((err) => {
                    console.log('could not signout cleanly', err);
                    setIsLoggingOut(false);
                });
        } else {
            console.log('not authenticated, skipping...', auth, isAuthenticated);
        }
    };

    return (
        <UserContext.Provider
            value={{
                isAuthenticated,
                userInfo,
                login,
                logout,
                isLoggingIn,
                isLoggingOut,
                loginLogoutErrors
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

