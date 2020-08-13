import React from 'react';

import icon from './receipt.png';

const ReceiptIcon = ({ altText }) =>
    <img src={icon} size="40px" alt={altText || 'receipt' } height="25"/>;

export default ReceiptIcon;