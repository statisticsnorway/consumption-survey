import React, { useState } from 'react';
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';
import MyBrowserRouter from '../../utils/MyBrowserRouter';

const FloatingButton = ({mainProps, childButtonProps, className}) => {
    const [isOpen, setIsOpen] = useState(false);
    const childButtons =
        childButtonProps && Array.isArray(childButtonProps)
        && childButtonProps.map((btnProps) => (
            <ChildButton
                icon={btnProps.icon}
                onClick={() => { btnProps.onClick(); }}
                spacing={15}
                size={40}
                style={{ margin: '1rem' }}
            />
        )) || [];

    return (
        <FloatingMenu direction="up" spacing="15" isOpen={isOpen} className={className} slideSpeed={200}>
            <MainButton
                size={40}
                iconActive={mainProps.iconActive}
                iconResting={mainProps.iconResting || mainProps.iconActive}
                onClick={() => {
                    if (typeof mainProps.onClick === 'function') {
                        mainProps.onClick();
                    }
                    setIsOpen(!isOpen);
                }}>
            </MainButton>
            {childButtons}
        </FloatingMenu>
    );
};

export default FloatingButton;
