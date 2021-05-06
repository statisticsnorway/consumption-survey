import { createContext } from 'react';
import { PurchaseType, PurchasesByDate } from './firebase/model/Purchase';
import { FirebaseAuth } from '@firebase/auth-types';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { FirebaseStorage } from '@firebase/storage-types';
import { FirebaseDatabase } from '@firebase/database-types';
import { RegularExpenseType } from './firebase/model/RegularExpense';
import { SearchTermType } from './firebase/model/SearchTerm';

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

export type RespondentDetails = {
    pid: string;
    respondentId: string;
    ioNumber: number;
    diaryStart: string;
    diaryEnd: string;
    name: string;
    gender: string;
    dateOfBirth: string;
};

export type IDPortenTokenInfo = {
    accessToken: any;
    refreshToken: any;
    idToken: any;
    idTokenUserInfo: any;
};

export type UserContextType = {
    userInfo: UserInfoType;
    respondentDetails: RespondentDetails;
    login: (respondentDetails: RespondentDetails, idPortenTokenInfo: IDPortenTokenInfo) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoggingIn: boolean;
    isLoggingOut: boolean;
    loginLogoutErrors: any;
};

export const UserContext = createContext({} as UserContextType);

export type FireContextType = {
    auth: FirebaseAuth;
    firestore: FirebaseFirestore;
    storage: FirebaseStorage;
    rtdb: FirebaseDatabase;
    reset: () => void;
};

export const FireContext = createContext({} as FireContextType);

export type PurchasesContextType = {
    purchases: PurchaseType[];
    setPurchases: (purchases: PurchaseType[]) => void;
    purchasesByDate: PurchasesByDate;
    setPurchasesByDate: (PurchasesByDate) => void;
    clearPurchases: () => void;
};

export const PurchasesContext = createContext({} as PurchasesContextType);

export type ExpensesContextType = {
    expenses: RegularExpenseType[];
    setExpenses: (expense: RegularExpenseType[]) => void;
    clearExpenses: () => void;
};

export const ExpensesContext = createContext({} as ExpensesContextType);

export type SearchTermsContextType = {
    searchTerms: SearchTermType[];
    initialLoadComplete: boolean;
    setInitialLoadComplete: (status: boolean) => void;
    setSearchTerms: (terms: SearchTermType[]) => void;
    searchTermsErrors: any;
};

export const SearchTermsContext = createContext({} as SearchTermsContextType);

