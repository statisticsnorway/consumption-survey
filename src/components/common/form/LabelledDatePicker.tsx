import DayPickerInput from 'react-day-picker/DayPickerInput';
import { LabelledInputProps } from './LabelledInput';
import { useRef } from 'react';
import { DAYS_FULL, DAYS_SHORT, MONTHS, parseDate, SIMPLE_DATE_FORMAT, simpleFormat } from '../../../utils/dateUtils';

import labelledInputStyles from './labelledInput.module.scss';
import daypickerStyles from './daypicker.module.scss';

export type LabelledDatePickerProps = Omit<LabelledInputProps, 'onChange'> & {
    onChange: (newDate: string) => void;
    fallbackValue?: string;
}

const dayPickerInputClassNames = (isError = false) => ({
    container: isError ? daypickerStyles.dayPickerInputError : daypickerStyles.dayPickerInput,
    overlayWrapper: daypickerStyles.dayPickerOverlayWrapper,
    overlay: daypickerStyles.dayPickerOverlay,

    day: daypickerStyles.dayPickerDay,
    caption: daypickerStyles.dayPickerCaption,
    selected: daypickerStyles.dayPickerSelected,
    today: daypickerStyles.dayPickerToday,
});

const LabelledDatePicker = ({
                                id, label, value, fallbackValue,
                                validate, errorText, onChange,
                                inputComponent = null,
                                styleClass = '', style = {}
                            }: LabelledDatePickerProps) => {
    const dayPickerRef = useRef(null);
    return (
        <div className={labelledInputStyles.labelledInput}>
            <label htmlFor={`${id}-input`} className={labelledInputStyles.label}>{label}</label>
            <div className={labelledInputStyles.input}>
                <DayPickerInput
                    ref={dayPickerRef}
                    formatDate={simpleFormat}
                    format={SIMPLE_DATE_FORMAT}
                    parseDate={parseDate}
                    value={new Date(value ? value : fallbackValue)}
                    onDayChange={dt => onChange(dt.toISOString())}
                    placeholder={`${simpleFormat(value)}`}
                    keepFocus={false}
                    inputProps={{readOnly: true}}
                    classNames={dayPickerInputClassNames(!validate(value))}
                    dayPickerProps={{
                        months: MONTHS,
                        weekdaysLong: DAYS_FULL,
                        weekdaysShort: DAYS_SHORT,
                        firstDayOfWeek: 1
                    }}
                />
                {!validate(value) &&
                    <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-filled">{errorText}</p>
                }
            </div>
        </div>
    );
};

export default LabelledDatePicker;
