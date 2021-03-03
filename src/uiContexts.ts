import { createContext, ReactNode } from 'react';
import { PouchDB } from 'react-pouchdb';
import { Reference } from '@firebase/storage-types';

export type ErrorHandler = (err: any) => void;
export type ImageData = string;

export type EnvironmentVariables = {
    [key: string]: string;
};

export type AppContextType = {
    envVars: EnvironmentVariables;
    firstVisitWeb?: boolean
    pwaActivated?: boolean
};

export const AppContext = createContext({} as AppContextType);

export type LayoutContextType = {
    isOnline: boolean;
    setIsOnline: (boolean) => void;
    showHeader: boolean;
    setShowHeader: (boolean) => void;
    showFooter: boolean;
    setShowFooter: (boolean) => void;
    headerContent: ReactNode;
    setHeaderContent: (ReactNode) => void;
    footerContent: ReactNode;
    setFooterContent: (ReactNode) => void;
};

export const LayoutContext = createContext({} as LayoutContextType);

export type ImageSaverContextType = {
    saveImage: (id: string, name: string, image: ImageData) => Promise<void>;
    getImage: (id: string, name: string) => Promise<ImageData>;
};

export const ImageHandlerContext = createContext({} as ImageSaverContextType);

export type PouchDBContextType = {
    getDB: (name: string) => PouchDB.Database;
    ready: boolean;
};

export const PouchDBContext = createContext({} as PouchDBContextType);

