export enum ExpenseFrequency {
    NONE = 'NONE',
    MONTHLY = 'MONTHLY',
    QUARTERLY = 'QUARTERLY',
    YEARLY = 'YEARLY',
};

export type RegularExpenseType = {
    id?: string;
    name: string;
    frequency: ExpenseFrequency;
    amount: string;
    registeredTime?: string;
};
