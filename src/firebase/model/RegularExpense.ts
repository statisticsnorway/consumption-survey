export enum ExpenseFrequency {
    NONE = 'NONE',
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    BI_MONTHLY = 'BI_MONTHLY',
    QUARTERLY = 'QUARTERLY',
    HALF_YEARLY = 'HALF_YEARLY',
    YEARLY = 'YEARLY',
}

export type RegularExpenseType = {
    id?: string;
    name: string;
    frequency: ExpenseFrequency;
    kr: Number;
    cents: Number;
};
