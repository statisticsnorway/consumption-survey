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
                {options[selection]}
                <ChevronDown />
            </button>
            {show &&
            <div className="dropdownItems">
                {Object.keys(options).map(k => <a onClick={(e) => {
                    onSelectChange({target: {value: k}});
                }}>{(typeof renderOption === 'function') ? renderOption(k) : options[k]}</a>)}
            </div>
            }
        </div>
    );
};

export default DropDown;
