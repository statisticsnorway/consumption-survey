import { useState } from 'react';

export type DropdownOption = {
    key: string;
    label: string;
}
export type DropdownProps = {
    options: DropdownOption[];
    defaultSelection: string;
    onSelect: (value: string) => void;
}

const Dropdown = ({ options, onSelect, defaultSelection = options[0].key } : DropdownProps) => {
    const [selected, setSelected] = useState(defaultSelection);
    const selectOptions = options.map(opt => <option value={opt.key}>{opt.label}</option>);

    const onChange = ({ target: { value }}) => {
        setSelected(value);
        onSelect(value);
    };

    return (
        <select onChange={onChange} value={selected}>
            {selectOptions}
        </select>
    );
};

export default Dropdown;
