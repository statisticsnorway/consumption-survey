import React from 'react';
import PropTypes from 'prop-types';

const CheckboxAlt = ({
                      callback, children, className, disabled, selected, tabIndex, value,
                  }) => (
    <div className={`ssb-checkbox${className ? ` ${className}` : ''} padding-tp-bm-10px flex-container`}>
        <input
            className={'width-20'}
            tabIndex={tabIndex}
            disabled={disabled}
            id={value}
            checked={selected}
            onChange={() => callback(value)}
            type="checkbox"
            value={value}
        />
        <label className="checkbox-label width-80 flex-row-elements-top" htmlFor={value}>
            <div className={'width-100'}>
                {children}
            </div>
        </label>
    </div>
);

CheckboxAlt.defaultProps = {
    callback: () => {
    },
    tabIndex: 0,
};

CheckboxAlt.propTypes = {
    callback: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    tabIndex: PropTypes.number,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default CheckboxAlt;
