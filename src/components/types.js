import PropTypes from 'prop-types';

export const receiptType = PropTypes.shape({
    format: PropTypes.string,
    url: PropTypes.string,
});

export const itemType = PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    category: PropTypes.string,
    unitCost: PropTypes.number,
    quantity: PropTypes.number,
    totalCost: PropTypes.number,
    receipt: receiptType,
});