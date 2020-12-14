import NumberFormat from 'react-number-format';
import { ChangeEvent, ReactElement, ReactNode } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';

export interface NumberComponentProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (e: { target: { name: string, value: string } }) => void;
    name: string;
};

export const NumberComponent = ({inputRef, onChange, name, ...rest}: NumberComponentProps) => (
    <NumberFormat
        {...rest}
        getInputRef={inputRef}
        onValueChange={(values) => {
            onChange({
                target: {
                    name,
                    value: values.value,
                },
            });
        }}
        isNumericString
    />
);

export type NumberInputProps = {
    prefix?: ReactNode;
    suffix?: ReactNode;
    label?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    id?: string,
    name?: string;
    value: string | number;
};

const NumberInput = ({
                         prefix, suffix,
                         label, id, name,
                         value, onChange
                     }: NumberInputProps) => {
    let props = {
        id,
        name,
        value,
        onChange,
    };

    let inputProps = {};

    if (label) {
        Object.assign(props, {label});
    }

    if (prefix) {
        Object.assign(inputProps, {
            startAdornment: (
                <InputAdornment position="start">{prefix}</InputAdornment>
            ),
        });
    }

    if (suffix) {
        Object.assign(inputProps, {
            endAdornment: (
                <InputAdornment position="end">{suffix}</InputAdornment>
            ),
        })
    }

    return (
        <TextField
            {...props}
            InputProps={{
                inputComponent: NumberComponent as any,
                ...inputProps,
            }}
        />
    )
};

export default NumberInput;
