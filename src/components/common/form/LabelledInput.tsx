import { FormEvent, ReactNode } from 'react';
import { TextField } from '@material-ui/core';

import styles from './labelledInput.module.scss';

export interface LabelledInputProps {
    id: string;
    label: string;
    value: string;
    validate: (val: string) => boolean;
    errorText: string;
    onChange: (string) => void;
    inputComponent?: ReactNode;
    style?: object;
    styleClass?: string;
};

const LabelledInput = ({
                           id, label, value,
                           validate, errorText,
                           onChange,
                           inputComponent = null,
                           style = {}, styleClass = ''
                       }: LabelledInputProps) => {
    return (
        <div className={`${styles.labelledInput} ${styleClass}`} style={style}>
            <label htmlFor={`${id}-input`} className={styles.label}>{label}</label>
            <TextField
                value={value}
                onChange={(e) => {onChange(e.target.value); }}
                error={!validate(value)}
                className={styles.input}
                helperText={!validate(value) ? errorText : null}
            />
        </div>
    );
};

export default LabelledInput;
