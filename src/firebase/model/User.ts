export const getProfilePathForUser = (uid: string) =>
        `/users/${uid}/profile/about`;

export const getPreferencesPathForUser = (uid: string) =>
    `/users/${uid}/profile/preferences`;

export const INIT_USER_PREFERENCES = {
    language: 'nb',
    showOnboarding: true,
};
