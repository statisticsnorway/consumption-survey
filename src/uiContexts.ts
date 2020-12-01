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
    footerContent: ReactNode;
    setFooterContent: (ReactNode) => void;
};

export const LayoutContext = createContext({} as LayoutContextType);
