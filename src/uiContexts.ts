import { createContext } from 'react';

export type LayoutContextType = {
    showUpdateSnackbar: boolean;
};

export const LayoutContext = createContext({} as LayoutContextType);
