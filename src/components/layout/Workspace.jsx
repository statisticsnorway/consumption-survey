import { useContext } from 'react';
import { UserContext } from '../../contexts';

import styles from './styles/workspace.module.scss'
import Loader from '../common/Loader';

const Workspace = ({ children }) => {
  return (
    <div className={styles.workspace}>
        {children}
    </div>
  )
};

export const WorkspacePanel = ({ children }) => {
  const {isLoggingIn, isLoggingOut} = useContext(UserContext);
  return (
      <div className={styles.workspacePanel}>
        {(isLoggingIn || isLoggingOut) && <Loader />}
        {!(isLoggingIn || isLoggingOut) && children}
      </div>
  );
};

export default Workspace
