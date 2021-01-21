export const PATHS = {
    DASHBOARD: '/dashboard/Dashboard',
    EDIT_PURCHASE: '/purchases/editPurchase',
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
