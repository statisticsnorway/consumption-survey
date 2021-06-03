import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useContext, useEffect } from 'react';
import Loader from '../components/common/Loader';
import {defaultState} from "../store/reducers/questionReducer";
import {CHANGE_ALL} from "../store/actionTypes";
import {useStore} from "react-redux";

const appConfig = getConfig();

const Logout = () => {
    const router = useRouter();
    const store = useStore()

    const getLogoutUrl = () => {
        const {envVars} = appConfig.publicRuntimeConfig;
        const {NEXT_PUBLIC_AUTH_URL, NEXT_PUBLIC_AUTH_LOGOUT_PATH} = envVars;
        return `${NEXT_PUBLIC_AUTH_URL}${NEXT_PUBLIC_AUTH_LOGOUT_PATH}`;
    };

    useEffect(() => {
        //not sure if necessary
        const defState = defaultState
        store.dispatch({
            type: CHANGE_ALL,
            questions: defState.questions,
            allHistory: defState.history,
            focus: defState.currentFocus,
        })
        const doIdportenLogout = async () => {
            window.location.href = getLogoutUrl()     //TODO Must be done dynamically
        };

        doIdportenLogout();
    }, []);

    return <Loader />;
};

Logout.getInitialProps = () => ({});

export default Logout;
