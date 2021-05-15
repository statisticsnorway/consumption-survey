import { ADD_PURCHASE_MODES } from '../../uiConfig';
import { useState } from 'react';

export type AddPurchaseProps = {
    mode?: string;
};

const AddPurchase = ({mode = ADD_PURCHASE_MODES.SCAN}: AddPurchaseProps) => {
    const [showScan, setShowScan] = useState(mode === ADD_PURCHASE_MODES.SCAN);

    return (
        <>
            {showScan && <p>Camera</p>}
            {!showScan && <p>Manual</p>}
        </>
    );
};

export default AddPurchase;
