import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle } from 'react-feather';

const RadioButton = ({
                         id, callback, children, className, disabled, name, selected, tabIndex, value, orientation,
                         noSkin = false,
                     }) => (
    <div
        className={`${noSkin ? '' : 'radio-alt-container'} ${orientation === 'row' ? 'width-90 padding-rt-10px' : 'width-100'} padding-tp-bm-7px ${className ? ` ${className}` : ''}`}>
        <input
            tabIndex={tabIndex}
            checked={selected}
            id={id}
            name={name}
            disabled={disabled}
            onChange={() => callback(value)}
            type="radio"
            value={value}
        />
        <label className="radio-label flex-container" htmlFor={id}>
            {!noSkin &&
            <CheckCircle
                className={`ui-icon-circle-check ${selected ? 'margin-rt-15px dy-true' : 'dy-none'}`}
                size={22}
                color={'white'}
                onClick={event => {
                    event.preventDefault();
                }}
            />
            }
            {children}
        </label>
    </div>
);

RadioButton.defaultProps = {
    callback: () => {
    },
    disabled: false,
    tabIndex: 0,
};

RadioButton.propTypes = {
    id: PropTypes.string,
    callback: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    selected: PropTypes.bool,
    tabIndex: PropTypes.number,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default RadioButton;
