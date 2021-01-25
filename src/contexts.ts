import { createContext } from 'react';
import { PurchaseType, PurchasesByDate } from './firebase/model/Purchase';
import { FirebaseAuth } from '@firebase/auth-types';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { FirebaseStorage } from '@firebase/storage-types';
import { FirebaseDatabase } from '@firebase/database-types';
import { RegularExpenseType } from './firebase/model/RegularExpense';

export type SurveyInfo = {
    journalStart: Date;
    journalEnd: Date;
};

export type UserInfoType = {
    userName: string;
    firstName?: string;
    lastName?: string;
    email: string;
    surveyInfo: SurveyInfo;
};

export type UserContextType = {
    userInfo: UserInfoType;
    login: (userName: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoggingIn: boolean;
};

export const UserContext = createContext({} as UserContextType);

export type FireContextType = {
    auth: FirebaseAuth;
    firestore: FirebaseFirestore;
    storage: FirebaseStorage;
    rtdb: FirebaseDatabase;
};

export const FireContext = createContext({} as FireContextType);

export type PurchasesContextType = {
    purchases: PurchaseType[];
    setPurchases: (purchases: PurchaseType[]) => void;
    purchasesByDate: PurchasesByDate;
    setPurchasesByDate: (PurchasesByDate) => void;
};

export const PurchasesContext = createContext({} as PurchasesContextType);

export type ExpensesContextType = {
    expenses: RegularExpenseType[];
    setExpenses: (expense: RegularExpenseType[]) => void;
};

export const ExpensesContext = createContext({} as ExpensesContextType);
