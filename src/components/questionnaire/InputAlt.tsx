import React, {InputHTMLAttributes} from 'react';

export type ReactInput = InputHTMLAttributes<HTMLInputElement>
export interface Props extends ReactInput {
    id: string;
    label: string;
    hint?: string;
    error?: string;
    warning?: string;
    success?: string;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
    fluid?: boolean;
    suffix?: string;
    disabled?: boolean;
    readOnly?: boolean;
    negative?: boolean;
    as?: any
}

const Input = ({
                   className,
                   error,
                   id,
                   label,
                   negative,
                    ...props
               }: Props) => {
    return (
        <div
            className={`ssb-input${negative ? ' negative' : ''}${error ? ' error' : ''}${className ? ` ${className}` : ''}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <div className="input-wrapper">
                <input
                    id={id}
                    className={error ? ' with-icon' : ''}
                    {...props}
                />
            </div>
        </div>
    );
};

export default Input;
