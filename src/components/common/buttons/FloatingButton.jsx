import { useState } from 'react';
// import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';
import { StylesProvider } from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { Plus, X } from 'react-feather';

import styles from './fab.module.scss';

const FloatingButton = ({
                            mainProps,
                            childButtonProps,
                            className
                        }) => {
    const [isOpen, setIsOpen] = useState(false);
    /*
    const childButtons =
        childButtonProps && Array.isArray(childButtonProps)
        && childButtonProps.map((btnProps) => (
            <ChildButton
                icon={btnProps.icon}
                onClick={(e) => {
                    btnProps.onClick(e);
                    setIsOpen(false);
                }}
                spacing={15}
                size={40}
                style={{margin: '1rem'}}
                className={`li--${btnProps.id}`}
            />
        )) || [];

     */

    return (
        <>
            {isOpen &&
            <div className={styles.globalOverlay}></div>
            }
            <StylesProvider injectFirst>
                <SpeedDial
                    ariaLabel="fab"
                    open={isOpen}
                    icon={<SpeedDialIcon openIcon={<X />} />}
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
