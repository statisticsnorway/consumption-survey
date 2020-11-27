import { createContext } from 'react';
import { FirebaseAuth } from '@firebase/auth-types';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { FirebaseStorage } from '@firebase/storage-types';
import { PurchaseType } from './firebase/model/Purchase';

export type UserInfoType = {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
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
};

export const FireContext = createContext({} as FireContextType);

export type PurchasesContextType = {
    purchases: PurchaseType[];
    addPurchase: (PurchaseType) => void;
};

export const PurchasesContext = createContext({} as PurchasesContextType);
