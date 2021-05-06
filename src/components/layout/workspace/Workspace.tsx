import styles from './workspace.module.scss';
import { ReactElement, ReactNode, ReactNodeArray } from 'react';
import { useRouter } from 'next/router';

export type WorkspaceProps = {
    children?: ReactNode | ReactNodeArray | ReactElement;
};

const Workspace = ({ children }: WorkspaceProps) => {
    const router = useRouter();

    return (
        <div className={styles.workspace}>
            {children}
            {router.pathname}
        </div>
    );
};

export default Workspace;
