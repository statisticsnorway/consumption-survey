import React, { useState } from 'react';
import { ChevronDown } from 'react-feather';

import './dropdown.scss';

const DropDown = (props) => {
    const [show, setShow] = useState(false);
    const toggleShow = (e) => {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        setShow(!show);
    }

    const {id, options, onChange, selection, disabled, renderOption, styleClass} = props;

    console.log('current selection', selection, options, `-${options[selection || 0]}-`);

    const onSelectChange = (e) => {
        onChange(e);
        toggleShow();
    }

    return (
        <div className="dropdown">
            <button
                id={`${id}-btn`}
                className="dropdownBtn"
                onClick={toggleShow}
                disabled={disabled}
            >
                <span>{options[selection ? selection : 0]}</span>
                <ChevronDown />
            </button>
            {show &&
            <div className="dropdownItems">
                {Object.keys(options).map(k => k > 0 ? <a onClick={(e) => {
                    onSelectChange({target: {value: k}});
                }}>{(typeof renderOption === 'function') ? renderOption(k) : options[k]}</a> : null)}
            </div>
            }
        </div>
    );
};

export default DropDown;
