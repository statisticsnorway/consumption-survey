import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonAlt from "./RadioButtonAlt";

const RadioGroup = ({ id, className, groupName, header, items, onChange, orientation, selectedValue, disabled=false }) => {

	return (
		<div id={id} className={`ssb-radio-group width-100 ${className ? ` ${className}` : ''}`}>
			{header && <div className="radio-group-header">{header}</div>}
			<div className={`boxes flex-${orientation} ${orientation === "row" ? "width-100" : "width-100"}`}>
				{items.map((it, index) => (
					<RadioButtonAlt
						id={`${id}-${it.value}`}
						key={it.value}
						index={index}
						orientation={orientation}
						selected={it.value === selectedValue}
						value={it.value}
						name={groupName || header}
						callback={ e => {
							onChange(e)
						}}
						disabled={it.disabled || disabled}
					>{it.label}
					</RadioButtonAlt>
				))}
			</div>
		</div>
	);
};

RadioGroup.defaultProps = {
	onChange: () => {},
	orientation: 'column',
};

RadioGroup.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	groupName: PropTypes.string,
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
	selectedValue: PropTypes.string,
};

export default RadioGroup;
