import { add, sub } from 'date-fns';

export const PATHS = {
    DASHBOARD: '/dashboard/Dashboard',
    EDIT_PURCHASE: '/purchases/editPurchase',
    EDIT_EXPENSE: `/`,
    AUTH_IDP: '/auth/api'
};

export const TABS_PARAMS = {
    SELECTED_TAB: 'selectedTab',
    SELECTED_DATE: 'selectedDate',
};

export const DASHBOARD_TABS = {
    HOME: 'diary',
    ENTRIES: 'entries',
    REGULAR_EXPENSES: 'regularExpenses',
    OTHER: 'otherExpenses',
};

export const makeDashboardPath = (selectedTab, additionalParams) => {
    const queryStr = Object.keys(additionalParams)
        .reduce((acc, key) => `${acc}&${key}=${additionalParams[key]}`, '');

    return `${PATHS.DASHBOARD}?${TABS_PARAMS.SELECTED_TAB}=${selectedTab}${queryStr}`;
};

export type DeleteConfirmProps = {
    title: string;
    text: string;
    entityInfo: string;
    textWarning: string;
    confirmText: string;
    cancelText: string;
};

export const modifiers = (surveyInfo) => ({
    surveyPeriod: {
        after: surveyInfo.journalStart,
        before: surveyInfo.journalEnd,
    },
    missingStretch: {
        after: new Date(2020, 8, 10),
        before: new Date(2020, 8, 14),
    },
    surveyPeriodFirstDay: add(surveyInfo.journalStart, {days: 1}),
    surveyPeriodLastDay: sub(surveyInfo.journalEnd, {days: 1}),
});

export const getModifiers = (purchases, surveyInfo) => {
    const withEntries = purchases.map(purchase => new Date(purchase.purchaseDate));
    return {
        ...modifiers(surveyInfo),
        withEntries,
    };
};

/** Databases */
export const DATABASE_RECEIPTS = 'receipts';
export const DATABASE_PURCHASE_RECEIPTS = 'purchase-receipts';

export const POUCH_DATABASES = [
    DATABASE_RECEIPTS,
    DATABASE_PURCHASE_RECEIPTS,
];
