import { ChangeEvent, ReactElement } from 'react';
import { FormInputViewMode } from './inputConstants';

import styles from './textfield.module.scss';

export enum AdornmentPosition {
    Suffix = 'Suffix',
    Prefix = 'Prefix',
};

export type TextFieldProps = {
    value: string;
    placeholder: string;
    size: string | number;
    adornment: string;
    adornmentPosition: AdornmentPosition;
    className: string;
    style: object;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    inputComp: ReactElement;
    viewMode: FormInputViewMode;
};

const TextField = ({
                       placeholder = '',
                       adornment = '', adornmentPosition = AdornmentPosition.Suffix,
                       className = '', style = {},
                       size = '5',
                       onChange,
                       inputComp = null,
                       value = '',
                       viewMode = FormInputViewMode.EDIT,
                   }: TextFieldProps) => {
    return (viewMode === FormInputViewMode.VIEW) ? (
        <div className={`${styles.textfield} ${className}`} style={style}>
            {(adornmentPosition === AdornmentPosition.Prefix) &&
            <span className={styles.textfieldAdornmentPrefix}>{adornment}</span>
            }
            <div className={styles.textfieldInput}>
                <span>{value}</span>
            </div>
            {(adornmentPosition === AdornmentPosition.Suffix) &&
            <span className={styles.textfieldAdornmentSuffix}>{adornment}</span>
            }
        </div>
    ) : (
        <div className={`${styles.textfield} ${className}`} style={style}>
            {(adornmentPosition === AdornmentPosition.Prefix) &&
            <span className={styles.textfieldAdornmentPrefix}>{adornment}</span>
            }
            <div className={styles.textfieldInput}>
                {(inputComp ? inputComp : (
                    <input
                        size={Number(size)}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                ))}
            </div>
            {(adornmentPosition === AdornmentPosition.Suffix) &&
            <span className={styles.textfieldAdornmentSuffix}>{adornment}</span>
            }
        </div>
    );
};

export default TextField;
