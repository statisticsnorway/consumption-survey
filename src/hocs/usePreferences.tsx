import { useContext, useEffect, useState } from 'react';
import { FireContext, UserContext, UserPreferencesType } from '../contexts';

const usePreferences = () => {
    const {userInfo, userPreferences, isAuthenticated} = useContext(UserContext);
    const {firestore} = useContext(FireContext);
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        if (firestore && isAuthenticated && userInfo) {
            setReady(true);
        }
    }, [firestore, isAuthenticated, userInfo]);

    const getPrefsDocForUser = () =>
        `/user/${userInfo.respondentDetails.respondentId}/profile/preferences`

    const getPreferences = (): UserPreferencesType => {
        if (ready) {
            return userPreferences;
        } else {
            console.log('firebase preferences not ready yet ..', firestore, userInfo, userPreferences);
            return null;
        }
    };


    const savePreferences = (prefs: UserPreferencesType) => {
        if (ready) {
            return firestore.doc(getPrefsDocForUser())
                .set(prefs, {merge: true});
        } else {
            console.log('firebase preferences not ready yet ..', firestore, userInfo, userPreferences);
            return null;
        }
    };

    const getPreference = (prefName: string) => {
        if (ready) {
            return userPreferences[prefName];
        } else {
            console.log('firebase preferences not ready yet ..', firestore, userInfo, userPreferences);
            return null;
        }
    };

    const setPreference = (prefName: string, prefValue: any) => {
        if (ready) {
            return firestore
                .doc(getPrefsDocForUser())
                .set({
                    [prefName]: prefValue
                }, { merge: true });
        } else {
            console.log('firebase preferences not ready yet ..', firestore, userInfo, userPreferences);
            return null;
        }
    };

    return {getPreferences, savePreferences, getPreference, setPreference};
};

export default usePreferences;
