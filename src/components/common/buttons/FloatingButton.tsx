import { useState, ReactNode } from 'react';
// import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';
import { StylesProvider } from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { Edit, Plus, X } from 'react-feather';

import styles from './fab.module.scss';
import { DO_NOTHING } from '../../../utils/jsUtils';

export type MainButtonProps = {
    title?: string;
    iconResting: ReactNode;
    iconActive?: ReactNode;
    onOpen?: () => void;
    onClose?: () => void;
    onClick?: () => void;
};

export type ChildMenuProps = {
    id: string;
    title: string;
    onClick: () => void;
    icon: ReactNode;
};

export type FloatingButtonProps = {
    mainProps: MainButtonProps;
    childButtonProps?: ChildMenuProps[];
    className?: string;
    bgOverlay?: boolean;
}

const FloatingButton = ({
                            mainProps,
                            childButtonProps,
                            className,
                            bgOverlay = true
                        }: FloatingButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen && bgOverlay &&
            <div className={styles.globalOverlay}></div>
            }
            <StylesProvider injectFirst>
                <SpeedDial
                    ariaLabel="fab"
                    open={isOpen}
                    title={mainProps.title || ''}
                    icon={<SpeedDialIcon openIcon={mainProps.iconActive}/>}
                    onClick={(typeof mainProps.onClick === 'function') ? mainProps.onClick : DO_NOTHING}
                    onOpen={() => {
                        setIsOpen(true);
                        if (typeof mainProps.onOpen === 'function') {
                            mainProps.onOpen();
                        }
                    }}
                    onClose={() => {
                        setIsOpen(false);
                        if (typeof mainProps.onClose === 'function') {
                            mainProps.onClose();
                        }
                    }}
                    className={className}
                >
                    {childButtonProps && Array.isArray(childButtonProps) &&
                    childButtonProps.map(action => (
                        <SpeedDialAction
                            title={action.title}
                            key={action.id}
                            onClick={action.onClick}
                            icon={action.icon}
                            tooltipOpen
                            tooltipTitle={action.title}
                        />
                    ))
                    }
                </SpeedDial>
            </StylesProvider>
        </>
    );
    /*
        < FloatingMenu
    direction = 'up'
    spacing = '15'
    isOpen = {isOpen}
    className = {className}
    slideSpeed = {200} >
        < MainButton
    size = {40}
    iconActive = {mainProps.iconActive}
    iconResting = {mainProps.iconResting || mainProps.iconActive}
    onClick = {()
=>
    {
        if (typeof mainProps.onClick === 'function') {
            mainProps.onClick();
        }
        setIsOpen(!isOpen);
    }
}>
<
    /MainButton>
    {
        childButtons
    }
</FloatingMenu>
*/
};

export default FloatingButton;
