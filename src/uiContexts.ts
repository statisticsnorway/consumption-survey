import { createContext, ReactNode } from 'react';

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
    showHeader: boolean;
    setShowHeader: (boolean) => void;
    showFooter: boolean;
    setShowFooter: (boolean) => void;
    headerContent: ReactNode;
    setHeaderContent: (ReactNode)=> void;
    footerContent: ReactNode;
    setFooterContent: (ReactNode) => void;
};

export const LayoutContext = createContext({} as LayoutContextType);
