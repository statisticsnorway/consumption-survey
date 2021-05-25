import React from 'react';
import PropTypes from 'prop-types';
import CheckboxAlt from "./CheckboxAlt";

const CheckboxGroup = ({
                           className, header, items, onChange, orientation, selectedValues, id
                       }) => {

    return (
        <div className={`ssb-checkbox-group${className ? ` ${className}` : ''}`}>
            {header && <div className="checkbox-group-header">{header}</div>}
            <div className={`boxes flex-${orientation}`}>
                {items.map((it, index) => (
                    <CheckboxAlt
                        id={`${id}-${it.label}`}
                        key={it.value}
                        index={index}
                        selected={selectedValues.includes(it.value)}
                        value={it.value}
                        callback={(value) => onChange(value)}
                        disabled={it.disabled}
                    >{it.label}
                    </CheckboxAlt>
                ))}
            </div>
        </div>
    );
};

CheckboxGroup.defaultProps = {
    onChange: () => {
    },
    orientation: 'column',
    selectedValues: [''],
};

CheckboxGroup.propTypes = {
    className: PropTypes.string,
    header: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
    })).isRequired,
    onChange: PropTypes.func,
    orientation: PropTypes.oneOf([
        'column',
        'row',
    ]),
    selectedValues: PropTypes.array,
};

export default CheckboxGroup;
