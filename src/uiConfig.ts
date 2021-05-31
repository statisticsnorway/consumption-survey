import { add, sub } from 'date-fns';
import { ChangeEvent } from 'react';

export const PATHS = {
    HOME: '/home',
    CONSUMPTION: '/consumption',
    ADD_PURCHASE: '/consumption/purchases/add-purchase',
    EDIT_PURCHASE: '/consumption/purchases/edit-purchase',
    ADD_REGULAR_EXPENSE: '/consumption/expenses/add-regular-expense',
    EDIT_REGULAR_EXPENSE: '/consumption/expenses/edit-regular-expense',
    QUESTIONNAIRE: '/questionnaire',
    TASKS: '/tasks',
    PROGRESS: '/progress',
    CONTACT: '/support/contact',
    ABOUT: '/support/about'
};

export const addPurchasePath = (mode) =>
    `${PATHS.ADD_PURCHASE}?mode=${mode}`;

export const ADD_PURCHASE_MODES = {
    MANUAL: 'manual',
    SCAN: 'scan',
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

/** Change Event Handler */
export type INPUT_CHANGE_HANDLER = (e: ChangeEvent<HTMLInputElement>) => void;
