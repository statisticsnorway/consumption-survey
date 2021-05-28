import { createContext } from 'react';
import { MessagePanelType } from './components/common/blocks/MessagePanel';

export type LayoutContextType = {
    showUpdateSnackbar: boolean;
    showMessage: (msg: string) => void;
    clearMessages: () => void;
    messagePanelVisible: boolean;
    messagePanelType: MessagePanelType;
    messagePanelMsg: string;
    messagePanelAutoDisappear: boolean;
    showMessagePanel: (type: MessagePanelType, msg: string, autoDisappear?: boolean) => void;
    hideMessagePanel: () => void;
};

export const LayoutContext = createContext({} as LayoutContextType);

export type PouchDBContextType = {
    getDB: (name: string) => PouchDB.Database;
    ready: boolean;
};

export const PouchDBContext = createContext({} as PouchDBContextType);
