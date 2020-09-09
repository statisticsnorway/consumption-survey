import styles from './styles/workspace.module.scss';
import { createContext } from 'react';

import consumptionList from '../../mock/consumption';

export const WorkspaceContext = createContext({});

const Workspace = ({children}) => (
    <div className={styles.workspace}>
        <WorkspaceContext.Provider value={{consumptionList}}>
            {children}
        </WorkspaceContext.Provider>
    </div>
);

export const WorkspacePanel = ({children}) => (
    <div className={styles.workspacePanel}>{children}</div>
);

export default Workspace;
