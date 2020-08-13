import React from 'react';
import useCustomElement from 'use-custom-element';

import '@pwabuilder/pwainstall'

const Install = props => {
    const [customElementProps, ref] = useCustomElement(props);

    return <pwa-install {...customElementProps} ref={ref} />;
};

export default Install;
