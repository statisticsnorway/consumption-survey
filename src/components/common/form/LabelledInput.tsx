import { FormEvent, ReactNode } from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';

import styles from './labelledInput.module.scss';

export type LabelledInputProps = {
    id: string;
    label: string;
    value: string;
    validate: (val: string) => boolean;
    errorText: string;
    onChange: (string) => void;
    inputComponent?: ReactNode;
    style?: object;
    styleClass?: string;
} & TextFieldProps;

const LabelledInput = ({
                           id, label, value,
                           validate, errorText,
                           onChange,
                           inputComponent = null,
                           style = {}, styleClass = '',
                           ...inputProps
                       }: LabelledInputProps) => {
    return (
        <div className={`${styles.labelledInput} ${styleClass}`} style={style}>
            <label htmlFor={`${id}-input`} className={styles.label}>{label}</label>
            <TextField
                id={id}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                error={!validate(value)}
                className={styles.input}
                helperText={!validate(value) ? errorText : null}
                {...inputProps}
            />
        </div>
    );
};

export default LabelledInput;
