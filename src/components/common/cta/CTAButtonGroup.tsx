import styles from '../../home/homeCTA/homeCTA.module.scss';
import { ReactNodeArray } from 'react';

export type CTAButtonGroupProps = {
    children: ReactNodeArray;
    styleClass?: string;
    style?: object;
}

const CTAButtonGroup = ({ children, styleClass = '', style = {}}: CTAButtonGroupProps) => {
    return (
        <div className={styleClass}>
            {children}
        </div>
    );
};

export default CTAButtonGroup;
