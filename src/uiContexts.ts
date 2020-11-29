import { createContext, ReactNode } from 'react';

export type LayoutContextType = {
    footerContent: ReactNode;
    setFooterContent: (ReactNode) => void;
};

export const LayoutContext = createContext({} as LayoutContextType);
