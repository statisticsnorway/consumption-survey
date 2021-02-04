import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
// import { FireContext, UserContext } from '../contexts';
import { FireContext, SurveyInfo, UserContext, UserInfoType } from '../contexts';
import { i18n } from '../../i18n';
import { add, sub } from 'date-fns';

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

const TODAY = new Date();

export const DUMMY_SURVEY_INFO: SurveyInfo = {
    journalStart: sub(TODAY, {days: 3}),
    journalEnd: add(TODAY, {days: 12}),
}

const UserProvider = ({children}) => {
    const {auth, firestore} = useContext(FireContext);
    const [userInfo, setUserInfo] = useState<UserInfoType>(null);
    const [userPreferences, setUserPreferences] = useState<UserPreferences>(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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
                            surveyInfo: DUMMY_SURVEY_INFO,
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

    useEffect(() => {
        setIsAuthenticated(!!userInfo);
    }, [userInfo]);


    const logout = () => {
        setUserInfo(null);
    };

    console.log('User Provider', !!userInfo);

    return (
        <UserContext.Provider
            value={{
                isAuthenticated,
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

