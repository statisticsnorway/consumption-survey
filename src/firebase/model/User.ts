import { RespondentDetails, UserStatusesType } from '../../contexts';

export const getUserPath = (uid: string) =>
    `/users/${uid}`;

export const getProfilePathForUser = (uid: string) =>
    `/users/${uid}/profile/about`;

export const getPreferencesPathForUser = (uid: string) =>
    `/users/${uid}/profile/preferences`;

export const getStatusesPathForUser = (uid: string) =>
    `/users/${uid}/profile/statuses`;

export const getQuestionnairePathForUser = (uid: string) =>
    `/users/${uid}/questionnaire/data`;

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

export enum StatusConstants {
    NOT_STARTED = 'NOT_STARTED',
    STARTED = 'STARTED',
    COMPLETE = 'COMPLETE',
}

export const INIT_USER_STATUSES: UserStatusesType = {
    surveyStatus: StatusConstants.NOT_STARTED,
    journalStatus: StatusConstants.NOT_STARTED,
    questionnaireStatus: StatusConstants.NOT_STARTED,
};

export const INIT_QUESTIONNAIRE_DATA = {
    status: 'NOT_STARTED',
};

export type RespondentTypeSecure = {
    respondentId: string;
    ioNumber: number;
    journalStart: Date;
    journalEnd: Date;
};

export const getRespondentDetailsSecure = (respondentDetails: RespondentDetails) => {
    const {respondentId, ioNumber, diaryStart, diaryEnd, name} = respondentDetails;
    return {
        respondentId,
        ioNumber,
        name,
        journalStart: diaryStart ? new Date(diaryStart) : new Date(),
        journalEnd: diaryEnd ? new Date(diaryEnd) : new Date(),
    };
};
