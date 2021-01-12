import styles from './styles/workspace.module.scss'

const Workspace = ({ children }) => {
  return (
    <div className={styles.workspace}>
        {children}
    </div>
  )
};

export const WorkspacePanel = ({ children }) => (
  <div className={styles.workspacePanel}>{children}</div>
);

export default Workspace
