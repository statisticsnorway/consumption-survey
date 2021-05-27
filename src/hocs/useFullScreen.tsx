import { useContext } from 'react';
import { LayoutContext } from '../uiContexts';

const useFullScreen = () => {
    const {showMessage, clearMessages} = useContext(LayoutContext);
}
