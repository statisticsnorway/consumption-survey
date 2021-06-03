export const getProfilePathForUser = (uid: string) =>
        `/users/${uid}/profile/about`;

export const getPreferencesPathForUser = (uid: string) =>
    `/users/${uid}/profile/preferences`;

export const INIT_USER_PREFERENCES = {
    language: 'nb',

    /**
     * houston, we have a chicken-and-egg problem!
     * to safely store preferences, firestore is ideal
     * but onboarding itself happens before login, per current design!
     * for now, we will assume that when a user has logged in, they have gone through onboarding
     */
    showOnboarding: false,
};
