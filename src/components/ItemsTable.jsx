import React from 'react';
import PropTypes from 'prop-types';
import { itemType } from './types';
import ItemRow from './ItemRow';

import './itemTable.scss';

const ItemsTable = ({
                        items,
                        noItemsText = 'No items to display'
                    }) => {
        if (items && items.length > 0) {
            const headerRow = (
                <tr>
                    <th style={{color: '#62919A'}}>#</th>
                    <th>Vare</th>
                    <th style={{textAlign: 'right'}}>Varepris</th>
                    <th style={{textAlign: 'right'}}>Antall</th>
                    <th style={{textAlign: 'right'}}>Pris</th>
                </tr>
            );
            const total = items.reduce((acc, item) => {
                return (acc + Number.parseFloat(item.totalCost.replace(',', '.')));
            }, 0)
            const totalRow = (
                <tr className="totalRow">
                    <td colSpan={4}>Total</td>
                    <td>{total.toFixed(2)}</td>
                </tr>
            );
            return (
                <table className="itemTable" style={{width: '100%'}}>
                    {headerRow}
                    {items.map((row, idx) => <ItemRow item={row} key={idx} rowNum={idx + 1}/>)}
                    {totalRow}
                </table>
            );
        }

        return (
            <table>
                <tr>
                    <td>{noItemsText}</td>
                </tr>
            </table>
        );
    }
;

export default ItemsTable;
