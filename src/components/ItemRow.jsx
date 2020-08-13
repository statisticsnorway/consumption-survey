import React from 'react';
import PropTypes from 'prop-types';
import { itemType } from './types';
import ReceiptIcon from './ReceiptIcon';

const ItemRow = ({ item, rowNum, showUnitAndQty = true }) => {
    const unitInfo = showUnitAndQty ? [
        <td style={{ textAlign: 'right' }}>{item.unitCost}</td>,
        <td style={{ textAlign: 'right' }}>{item.quantity}</td>,
    ]: null;

    console.log(unitInfo, [...unitInfo]);

    return (
        <tr key={rowNum}>
            <td style={{ color: '#62919A' }}>
                {rowNum}
            </td>
            <td>
                {item.name}
            </td>
            {[...unitInfo]}
            <td style={{ textAlign: 'right' }}>
                {item.totalCost}
            </td>
            <td>
                {item.receipt ? <ReceiptIcon /> : null }
            </td>
        </tr>
    );
};

ItemRow.propTypes = {
    item: itemType,
    idx: PropTypes.number,
};

export default ItemRow;
