import React from 'react';

import './modal.scss';

const Modal = ({ show, onClose, children }) => {
    // Render nothing if the "show" prop is false
    if (!show) {
        return null;
    }

    console.log('onClose', onClose);

    return (
        <div className="fbu-modal-overlay">
            <div className="fbu-modal-dialog">
                {children}

                <div className="fbu-modal-footer">
                    <button className="fbu-modal-close-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
