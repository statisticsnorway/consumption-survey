import { useContext, useEffect, useState } from 'react';
import getConfig from 'next/config';
import axios from 'axios';
import {
    FireContext,
    UserContext,
    IDPortenTokenInfo,
    RespondentDetails,
    UserInfoType,
    UserPreferencesType
} from '../contexts';
import {
    getPreferencesPathForUser,
    getProfilePathForUser,
    getRespondentDetailsSecure,
    getUserPath, INIT_USER_PREFERENCES,
    RespondentTypeSecure
} from './model/User';

const appConfig = getConfig();

export type LoginInfoType = {
    firebaseToken: string;
    respondentDetails: RespondentDetails;
}

export type LoginStateType = {
    isLoggingIn: boolean;
    isLoggingOut: boolean;
    loginLogoutErrors: any;
    loginInfo: LoginInfoType | null;
    isAuthenticated: boolean;
}

export const INIT_LOGIN_STATE: LoginStateType = {
    isLoggingIn: false,
    isLoggingOut: false,
    loginLogoutErrors: null,
    loginInfo: null,
    isAuthenticated: false,
};

export type UserStateType = {
    userInfo: UserInfoType | null;
    userPreferences: UserPreferencesType | null;
};

export const INIT_USER_STATE: UserStateType = {
    userInfo: null,
    userPreferences: null,
};

const getLoginUrl = () => {
    const {envVars} = appConfig.publicRuntimeConfig;
    return `${envVars.NEXT_PUBLIC_BFF_HOST}/login`;
};

const extractSurveyInfo = (respondentInfo: RespondentDetails) => ({
    ioNumber: respondentInfo.ioNumber,
    journalStart: new Date(respondentInfo.diaryStart),
    journalEnd: new Date(respondentInfo.diaryEnd),
});

const UserProvider = ({children}) => {
    const {auth, firestore} = useContext(FireContext);
    const [userState, setUserState] = useState<UserStateType>(INIT_USER_STATE);
    const [loginState, setLoginState] = useState<LoginStateType>(INIT_LOGIN_STATE);

    const updateUserInfo = (key, val) => {
        const userInfo = {
            ...userState.userInfo,
            [key]: val,
        };

        setUserState({
            ...userState,
            userInfo
        });
    };

    const login = async (respondentInfo: RespondentDetails, idPortenInfo: IDPortenTokenInfo) => {
        if (!auth) {
            console.log('auth not ready');
            return;
        }

        if (loginState.isLoggingIn) {
            console.log('there is a login process already running, skipping', loginState);
            return;
        }

        if (!respondentInfo || !respondentInfo.respondentId) {
            console.log('no respondent id to fetch bff token for yet');
            return;
        }

        console.log('trying to obtain fb token for', respondentInfo, idPortenInfo, loginState, getLoginUrl());
        setLoginState(prevState => ({
            ...prevState,
            isLoggingIn: true,
        }));


        try {
            const loginRes = await axios.post(getLoginUrl(), {respondentInfo, idPortenInfo});

            if (loginRes.status >= 300) {
                console.log('BFF responded with a error/redirect status', loginRes);
                setLoginState(prevState => ({
                    ...prevState,
                    loginLogoutErrors: loginRes,
                }));

                return;
            }

            const {data: authInfo} = loginRes;

            if (!(authInfo && authInfo.firebaseToken && authInfo.userInfo)) {
                console.log('Empty response/No firebaseToken/no userInfo from BFF', authInfo);
                return;
            }

            return auth.signInWithCustomToken(authInfo.firebaseToken)
                .then(user => {
                    const loginInfo = {
                        firebaseToken: authInfo.firebaseToken,
                        respondentDetails: authInfo.respondentDetails
                    };

                    console.log('Successfully signed into firebase with custom token', user, loginState);
                    setLoginState(prevState => ({
                        ...prevState,
                        loginInfo,
                    }));
                })
                .catch(err => {
                    console.log('unable to sign into firebase with custom token', err);
                    setLoginState(prevState => ({
                        ...prevState,
                        loginLogoutErrors: err,
                    }));
                });
        } catch (err) {
            console.log('unable to fetch BFF token or sign into FB', err);
            setLoginState(prevState => ({
                ...prevState,
                loginLogoutErrors: err,
            }));
        }
    };

    const checkLoginComplete = () => {
        if (loginState.isLoggingIn && userState?.userInfo && userState?.userPreferences) {
            console.log('we have now all information about the user.. login is complete');
            setLoginState(prevState => ({
                ...prevState,
                isLoggingIn: false,
                isAuthenticated: true,
            }));
        } else {
            console.log('user logged into fb, but we do not yet have all information ... waiting');
        }
    };

    const checkLogoutComplete = () => {
        if (loginState.isLoggingOut) {
            console.log('completing logout ...');
            setLoginState(INIT_LOGIN_STATE);
            setUserState(INIT_USER_STATE);
        } else {
            console.log('no logout was in progress.. check again!');
        }
    };

    useEffect(() => {
        if (!auth) {
            console.log('firebase auth not ready');
        } else {
            auth.onAuthStateChanged(user => {
                console.log('[auth state change]', user);
                if (user) {
                    console.log('[auth] checking if login complete');
                    checkLoginComplete();
                } else {
                    console.log('checking if logout complete');
                    checkLogoutComplete();
                }
            });
        }
    }, [auth]);

    useEffect(() => {
        console.log('user state', userState);
        checkLoginComplete();
    }, [userState]);

    const clearUserInfo = () => {
        setUserState(INIT_USER_STATE);
    };

    const clearLoginState = () => {
        setLoginState(INIT_LOGIN_STATE);
    };

    const makeUserInfoFromRespondentDetails = (respondentDetails: RespondentDetails) => {
        const {respondentId, diaryStart, diaryEnd} = respondentDetails;
        return {
            userName: respondentId,
            surveyInfo: extractSurveyInfo(respondentDetails),
            respondentDetails,
        };
    };

    const fetchUserInfo = async (respondentId) => {
        const fbPromises = [
            await firestore.doc(getProfilePathForUser(respondentId)).get(),
            await firestore.doc(getPreferencesPathForUser(respondentId)).get(),
        ];

        return await Promise.all(fbPromises)
            .then(([profileDoc, prefDoc]) => {
                const profile = profileDoc.data() as RespondentTypeSecure;
                const {respondentDetails} = loginState.loginInfo;
                console.log('fetched profile', profile);
                console.log('respondentInfo', respondentDetails);
                const prefs = prefDoc.data() as UserPreferencesType;
                console.log('fetched preferences', prefs);

                setUserState({
                    ...userState,
                    userInfo: makeUserInfoFromRespondentDetails(respondentDetails),
                    userPreferences: prefs,
                });
            });
    };

    const saveProfileDefaults = async (respondentId) => {
        if (!loginState?.loginInfo?.respondentDetails) {
            throw new Error('attempting to save Profile defaults without loginInfo');
        }

        const {respondentDetails} = loginState.loginInfo;
        return firestore
            .doc(getProfilePathForUser(respondentId))
            .set(getRespondentDetailsSecure(respondentDetails));
    };

    const savePreferencesDefaults = async (respondentId) =>
        firestore
            .doc(getPreferencesPathForUser(respondentId))
            .set(INIT_USER_PREFERENCES);

    const setupDefaults = async (respondentId) => {
        const fbPromises = [
            await saveProfileDefaults(respondentId),
            await savePreferencesDefaults(respondentId),
        ];

        return await Promise.all(fbPromises)
            .then(() => {
                const {respondentDetails} = loginState?.loginInfo;
                setUserState({
                    userInfo: {
                        userName: respondentId,
                        surveyInfo: extractSurveyInfo(respondentDetails),
                        respondentDetails,
                    },
                    userPreferences: INIT_USER_PREFERENCES,
                });
            });
    };

    const setupUserInfo = async (respondentDetails: RespondentDetails) => {
        const {respondentId} = respondentDetails;
        console.log('Checking if user record exists', getProfilePathForUser(respondentId));
        return firestore
            .doc(getProfilePathForUser(respondentId))
            .get()
            .then(async (userRef) => {
                if (userRef.exists) {
                    console.log('user exists, trying to fetch info');
                    await fetchUserInfo(respondentId);
                } else {
                    console.log('user does not exist, setting up defaults');
                    await setupDefaults(respondentId);
                }
            });
    };

    const handleLoginError = (msg, err) => {
        console.log(`[Login error] ${msg}`, err);
        setLoginState(prevState => ({
            ...prevState,
            isLoggingIn: false,
            loginLogoutErrors: err,
        }));
        auth.signOut();
    };

    useEffect(() => {
        console.log('[login state change]', loginState);
        if (loginState && loginState.isLoggingIn && loginState.loginInfo) {
            const {respondentDetails} = loginState.loginInfo;
            try {
                setupUserInfo(respondentDetails);
            } catch(err) {
                handleLoginError('[surrounding try/catch] could not setup user info', err);
            }
        }
    }, [loginState]);

    const logout = () => {
        if (auth && loginState.isAuthenticated) {
            setLoginState(prevState => ({
                ...prevState,
                isLoggingOut: true,
            }));

            auth.signOut()
                .then(res => {
                    console.log('successfully logged out of firebase', res);
                    checkLogoutComplete();
                })
                .catch(err => {
                    console.log('could not logout of firebase', err);
                    setLoginState(prevState => ({
                        ...prevState,
                        loginLogoutErrors: err,
                    }));
                });
        } else {
            console.log('no auth/not authenticated, skipping logout', auth, loginState);
        }
    };

    return (
        <UserContext.Provider value={{
            ...userState,
            ...loginState,
            login,
            logout,
            respondentDetails: loginState?.loginInfo?.respondentDetails,
            updateUserInfo,
        }}>
            {children}
        </UserContext.Provider>
    );

};

export default UserProvider;
