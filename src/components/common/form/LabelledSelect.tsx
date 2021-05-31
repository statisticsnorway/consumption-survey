import { TextField, MenuItem, TextFieldProps } from '@material-ui/core';
import styles from './labelledInput.module.scss';
import { RegularExpenseType } from '../../../firebase/model/RegularExpense';
import { ChangeEvent } from 'react';

export type SelectOption = {
    key: string;
    value: string;
};

export type LabelledSelectProps = {
    id: string;
    label: string;
    value: string;
    validate: (val: string) => boolean;
    errorText: string;
    options: SelectOption[];
    onUpdate: (string) => void;
    styleClass?: string;
    style?: object;
} & TextFieldProps;

const makeSelectOptions = (options: SelectOption[] = []) =>
    options.map(opt => (
        <MenuItem key={opt.key} value={opt.key}>
            {opt.value}
        </MenuItem>
    ));

const LabelledSelect = ({
                            id, label, value,
                            options,
                            onUpdate,
                            validate,
                            errorText,
                            style = {}, styleClass = '', ...tfProps
                        }: LabelledSelectProps) => {
    return (
        <div className={`${styles.labelledInput} ${styleClass}`} style={style}>
            <label htmlFor={`select-${id}`}>{label}</label>
            <TextField
                value={value}
                select
                onChange={(e) => {
                    onUpdate(e.target.value);
                }}
                {...tfProps}
                error={!validate(value)}
                helperText={!validate(value) ? errorText : null}
            >
                {makeSelectOptions(options)}
            </TextField>
        </div>
    );
};

export default LabelledSelect;
