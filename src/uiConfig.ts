import { add, sub } from 'date-fns';

export const PATHS = {
    DASHBOARD: '/dashboard/Dashboard',
    EDIT_PURCHASE: '/purchases/editPurchase',
    EDIT_EXPESE: `/`
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

export const today = new Date();
export const surveyStart = sub(today, {days: 7});
export const surveyEnd = add(today, {days: 7});

export const modifiers = {
    surveyPeriod: {
        after: surveyStart,
        before: surveyEnd,
    },
    missingStretch: {
        after: new Date(2020, 8, 10),
        before: new Date(2020, 8, 14),
    },
    surveyPeriodFirstDay: add(surveyStart, {days: 1}),
    surveyPeriodLastDay: sub(surveyEnd, {days: 1}),
};

export const getModifiers = (purchases) => {
    const withEntries = purchases.map(purchase => new Date(purchase.purchaseDate));
    return {
        ...modifiers,
        withEntries,
    };
};
