import workspaceStyles from '../layout/workspace/workspace.module.scss';
import { ReactElement, ReactNode, ReactNodeArray } from 'react';

export type PageTitleProps = {
    title: string;
    subText?: ReactNode | ReactNodeArray | ReactElement;
};

const PageTitle = ({ title, subText }: PageTitleProps) => (
    <div className={workspaceStyles.pageTitle}>
        <h1>{title}</h1>
        {subText && <span className={workspaceStyles.subText}>{subText}</span>}
    </div>
);

export default PageTitle;
