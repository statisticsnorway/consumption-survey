import React, { useState } from 'react';
import Modal from '../components/dialogs/Modal';

const Safari = ({ showShimPopup }) => {
    const [showDialog, setShowDialog] = useState(showShimPopup);
    const toggle = (e) => { e.preventDefault(); setShowDialog(! showDialog); };

    return (
        <>
            <button onClick={toggle}>
                Show
            </button>
            <Modal show={showDialog} onClose={toggle}>
                Something
            </Modal>
        </>
    );
};

export default Safari;
