import { ChangeEvent, FocusEventHandler, ReactElement } from 'react';
import { FormInputViewMode } from './inputConstants';
import { DO_NOTHING } from '../../utils/jsUtils';

import styles from './textfield.module.scss';

export enum AdornmentPosition {
    Suffix = 'Suffix',
    Prefix = 'Prefix',
};

export type TextFieldProps = {
    id: string;
    value: string;
    placeholder: string;
    size: string | number;
    adornment: string;
    adornmentPosition: AdornmentPosition;
    className: string;
    style: object;
    onChange: (newVal: string | any) => void;
    onFocus: FocusEventHandler,
    inputComp: ReactElement;
    viewMode: FormInputViewMode;
    label: string | null | undefined;
    hints: string[] | null;
};

const TextField = ({
                       id,
                       placeholder = '',
                       adornment = '', adornmentPosition = AdornmentPosition.Suffix,
                       className = '', style = {},
                       size = '5',
                       onChange, onFocus = DO_NOTHING,
                       inputComp = null,
                       label = null,
                       value = '',
                       viewMode = FormInputViewMode.EDIT,
                       hints = null,
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
            {label && !inputComp &&
            <label htmlFor={`textfield-${id}`} className={styles.textFieldLabel}>{label}</label>
            }
            <div className={styles.textfieldInput}>
                {(inputComp ? inputComp : (
                    <input
                        id={`textfield-${id}`}
                        size={Number(size)}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value);
                        }}
                        onFocus={onFocus}
                    />
                ))}
            </div>
            {(adornmentPosition === AdornmentPosition.Suffix) &&
            <span className={styles.textfieldAdornmentSuffix}>{adornment}</span>
            }
            {hints &&
            <div className={styles.hints}>
                {hints.map(hint => (
                    <a
                        className={styles.hint}
                        onClick={() => {
                            onChange(hint);
                        }}
                    >
                        {hint}
                    </a>
                ))}
                <span className={styles.hintEtc}>osv..</span>
            </div>
            }
        </div>
    );
};

export default TextField;
