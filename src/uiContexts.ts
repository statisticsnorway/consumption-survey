import { createContext } from 'react';
import { MessagePanelType } from './components/common/blocks/MessagePanel';
import { LoggerType } from './utils/logUtils';

export type ON_COMPLETE_FN = () => void;

export enum AppContextStatus {
    INIT = 'init',
    COMPLETE = 'complete'
}

export type AppContextType = {
    onboarding: AppContextStatus;
    consent: AppContextStatus;
    installation: AppContextStatus;
};

export const AppContext = createContext({} as AppContextType);

export type LogContextType = {
    logger: LoggerType;
};

export const LogContext = createContext({} as LogContextType);

export type LayoutContextType = {
    showUpdateSnackbar: boolean;
    showMessage: (msg: string) => void;
    clearMessages: () => void;
    messagePanelVisible: boolean;
    messagePanelType: MessagePanelType;
    messagePanelMsg: string;
    messagePanelAutoDisappear: boolean;
    messageOnComplete: () => void;
    showMessagePanel: (type: MessagePanelType, msg: string, autoDisappear?: boolean, onComplete?: ON_COMPLETE_FN) => void;
    hideMessagePanel: () => void;
};

export const LayoutContext = createContext({} as LayoutContextType);

export type PouchDBContextType = {
    getDB: (name: string) => PouchDB.Database;
    ready: boolean;
};

export const PouchDBContext = createContext({} as PouchDBContextType);
