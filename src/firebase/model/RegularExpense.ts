import { PurchaseStatus } from './Purchase';

export enum RegularExpenseStatus {
    COMPLETE = 'COMPLETE',
    FBU_COMPLETE = 'FBU_COMPLETE',
    DELETE_REQUESTED = 'DELETE_REQUESTED',
    DELETED = 'DELETED',
}

export enum ExpenseFrequency {
    NONE = 'NONE',
    MONTHLY = 'MONTHLY',
    QUARTERLY = 'QUARTERLY',
    YEARLY = 'YEARLY',
}

export type RegularExpenseType = {
    id?: string;
    name: string;
    frequency: ExpenseFrequency;
    amount: string;
    registeredTime?: string;
    status: RegularExpenseStatus;
};

const EXPENSE_DELETE_STATUSES = [
    RegularExpenseStatus.DELETE_REQUESTED,
    RegularExpenseStatus.DELETED
];

export const isExpenseDeleted = (status: RegularExpenseStatus) =>
   EXPENSE_DELETE_STATUSES.includes(status);

export enum ExpensesSortOrder {
    OLDEST_FIRST = 'newestFirst',
    NEWEST_FIRST = 'oldestFirst'
}
