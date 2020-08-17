import React from 'react';
import { useParams } from 'react-router-dom';
import Workspace from '../Workspace';

import items from '../../mock/items';

const PurchaseDetail = () => {
    const { purchaseId } = useParams();

    return (
        <div>
            <Workspace items={items}/>
        </div>
    );
}

export default PurchaseDetail;
