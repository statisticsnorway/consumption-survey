import React from 'react';
import PropTypes from 'prop-types';
import ItemsTable from './ItemsTable';
import { itemType } from './types';
import { DISPLAY_TYPE_TABLE } from '../common/constants';

const Items = ({items, display = DISPLAY_TYPE_TABLE}) => {
    if (display === DISPLAY_TYPE_TABLE) {
        return (
            <ItemsTable
                items={items}
                noItemsText="Start med å skanne en kvittering"
            />
        );
    }

    return <h3>TBD: Display items in ways other than a table</h3>
};

Items.propTypes = {
    items: PropTypes.arrayOf(itemType),
}

export default Items;
