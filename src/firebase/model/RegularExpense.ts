export enum ExpenseFrequency {
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
  amount: number,
};
