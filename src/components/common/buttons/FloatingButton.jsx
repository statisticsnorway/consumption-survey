import { useState } from 'react';
// import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';

const FloatingButton = ({mainProps, childButtonProps, className}) => {
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
        <SpeedDial
            ariaLabel="fab"
            open={isOpen}
            onOpen={() => {
                setIsOpen(true);
            }}
            onClose={() => {
                setIsOpen(false);
            }}
            className={className}
        >
            {childButtonProps && Array.isArray(childButtonProps) &&
            childButtonProps.map(action => (
                <SpeedDialAction
                    key={action.id}
                    onClick={action.onClick}
                    icon={action.icon}
                    tooltipOpen
                    tooltipTitle={action.title}
                />
            ))
            }
        </SpeedDial>
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
