import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
// import { FireContext, UserContext } from '../contexts';
import {
	FireContext,
	IDPortenTokenInfo,
	RespondentDetails,
	SurveyInfo,
	UserContext,
	UserInfoType,
} from "../contexts"
import { add, sub } from "date-fns"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { useStore } from "react-redux"
import { getAnsweredValues } from "../components/questionnaire/questions/questionFunctionsUtils"
import { hydrateQuestionnaire } from "../components/questionnaire/questions/UpdateQuestionValue"
import { changeQuestionList } from "../store/actionCreators"
import { CHANGE_ALL, CHANGE_QUESTION_LIST } from "../store/actionTypes"

import getConfig from 'next/config';

export enum CommunicationPreference {
    EMAIL = 'EMAIL',
    IN_APP = 'IN-APP',
    SMS = 'SMS',
    PHONE = 'PHONE',
};

const appConfig = getConfig();

const getLoginUrl = () => {
    const {envVars} = appConfig.publicRuntimeConfig;
    return `${envVars.NEXT_PUBLIC_BFF_HOST}/login`;
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

const UserProvider = ({ children }) => {
	const router = useRouter()
	const { i18n } = useTranslation()
	const { auth, firestore, reset } = useContext(FireContext)
	const store = useStore()
	const [userInfo, setUserInfo] = useState<UserInfoType>(null)
	const [respondentDetails, setRespondentDetails] =
		useState<RespondentDetails>(null)
	const [userPreferences, setUserPreferences] = useState<UserPreferences>(null)
	const [isLoggingIn, setIsLoggingIn] = useState(false)
	const [isLoggingOut, setIsLoggingOut] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	const [loginLogoutErrors, setLoginLogoutErrors] = useState<any>(null)

    useEffect(() => {
        setIsAuthenticated(false);
    }, []);

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

    const extractSurveyInfo = (respondentInfo: RespondentDetails) => ({
        journalStart: respondentInfo.diaryStart,
        journalEnd: respondentInfo.diaryEnd,
    });


    const login = async (respondentInfo: RespondentDetails, idPortenInfo: IDPortenTokenInfo) => {
        if (!auth) {
            console.log('firebase auth not ready ...');
            return;
        }

        console.log('trying to obtain firebase token for ', respondentInfo, isLoggingIn, getLoginUrl());

        if (respondentInfo && respondentInfo.respondentId && !isLoggingIn) {
            setIsLoggingIn(true);
            const res = await axios.post(getLoginUrl(), {
                respondentInfo,
                idPortenInfo,
            });

            console.log('response from BFF', res);

            if ((res.status >= 200) && (res.status < 300)) {
                const {data: authInfo} = res;

                if (authInfo && authInfo.firebaseToken && authInfo.userInfo) {
                    return auth.signInWithCustomToken(authInfo.firebaseToken)
                        .then((user) => {
                            console.log('Successfully logged in as', user);
                            const loginInfo = {
                                ...authInfo.userInfo,
                                userName: authInfo.userInfo.id,
                                surveyInfo: extractSurveyInfo(respondentInfo),
                                respondentDetails: authInfo.respondentDetails,
                            };

							setUserInfo(loginInfo)
							store.subscribe(() => {
								const state = store.getState()
								const quesetionsState = state.questions
								const history = state.history
								const currentFocus = state.currentFocus
								const answers = getAnsweredValues(quesetionsState)
								firestore
									.doc(`/users/${authInfo.userInfo.id}/questionnaire/data`)
									.set(
										{
											status: "STARTED",
											answers,
											history,
											currentFocus,
										},
										{ merge: true }
									)
							})
							firestore
								.collection(`/users/${authInfo.userInfo.id}/questionnaire`)
								.doc("data")
								.get()
								.then((doc) => {
									const data = doc.data()
									if (data && data.answers) {
										const curState = store.getState()
										const hydrated = hydrateQuestionnaire(
											data.answers,
											curState.questions
										)
										store.dispatch({
											type: CHANGE_ALL,
											questions: hydrated,
											allHistory: data.history,
											focus: data.currentFocus,
										})
									}
								})
								.catch((err) => {
									console.log("cannot update answers", err)
								})

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
                console.log('[Login Err]: could not get auth token from BFF', res);
                setLoginLogoutErrors(res);
                setIsLoggingIn(false);
                throw new Error(JSON.stringify(res));
            }

            setIsLoggingIn(false);
        } /* else {
            await router.push('/login');
        } */
    };

    useEffect(() => {
        if (auth) {
            console.log('[UP] auth changed');
            auth.onAuthStateChanged((user) => {
                if (user) {
                    console.log('[Auth] current user',
                        user.uid,
                        user.getIdToken(),
                        user.refreshToken);

                    setIsLoggingIn(true);
                    // setIsAuthenticated(true);

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
        } else {
            console.log('[UP] auth empty');
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

            try {
                const sign = await auth.signOut()

                console.log('successfully signed out', sign);

                setUserInfo(null);
                setIsLoggingIn(false);
                setUserPreferences(null);
                setIsLoggingOut(false);

                // fireReset();
                setIsAuthenticated(false);
                // await router.push('/login');
            } catch (err) {
                console.log('could not signout cleanly', err);
                setIsLoggingOut(false);
            }
            // await router.push('/auth/logout');
            // await router.push('/logout')
            // window.location.reload();
            // window.location.href = "https://fbu.ssb.no/auth/logout"

        } else {
            console.log('not authenticated, skipping...', auth, isAuthenticated);
        }
    };

    return (
        <UserContext.Provider
            value={{
                isAuthenticated,
                userInfo,
                respondentDetails,
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

export const getInitialProps = () => ({});

export default UserProvider;

