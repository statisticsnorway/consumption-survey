import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import Modal from '../common/dialog/Modal';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DAYS_FULL, DAYS_SHORT, MONTHS, parseDate, SIMPLE_DATE_FORMAT, simpleFormat } from '../../utils/dateUtils';
import { Calendar } from 'react-feather';

import formStyles from '../form/form.module.scss';
import styles from './styles/addPurchase.module.scss';

export type PurchaseNameDateGroupProps = {
    show: boolean;
    currName?: string;
    currDate?: Date;
    onSubmit: (name, date) => void;
    onCancel: () => void;
};

const dayPickerInputClassNames = {
    container: styles.dayPickerInput,
    overlayWrapper: styles.dayPickerOverlayWrapper,
    overlay: styles.dayPickerOverlay,

    day: styles.dayPickerDay,
    caption: styles.dayPickerCaption,
    selected: styles.dayPickerSelected,
    today: styles.dayPickerToday,
};

const PurchaseNameDateGroup = ({
                                   show,
                                   currName = '', currDate = new Date(),
                                   onSubmit,
                                   onCancel
                               }: PurchaseNameDateGroupProps) => {
    const {t} = useTranslation('purchases');
    const [name, setName] = useState(currName);
    const [date, setDate] = useState(currDate);
    const dayPickerRef = useRef(null);
    const nameFieldRef = useRef(null);
    const [dayPickerVisible, setDayPickerVisible] = useState(false);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        /** Initial
         if (!currName) {
            setName(t('addPurchase.'));
        } */

        if (!currDate) {
            console.log('!!!! current date reset !!!!');
            setDate(new Date());
        }
    }, []);

    useEffect(() => {
        /**
         * need a separate effect for this as the comp is inside
         * a modal and is not mounted until required
         */
        if (show && nameFieldRef.current) {
            nameFieldRef.current.focus();
        }
    }, [show, nameFieldRef]);

    /** Changes from parent */
    useEffect(() => {
        if (currName) {
            setName(currName);
        }
        if (currDate) {
            setDate(currDate);
        }
    }, [currName, currDate]);

    const toggleDayPicker = () => {
        const dayPickerComp = dayPickerRef.current;
        if (!dayPickerComp) {
            console.log('XXXXX daypicker comp ref not initialized correctly');
        } else {
            dayPickerVisible ? dayPickerComp.hideDayPicker() : dayPickerComp.showDayPicker();
            setDayPickerVisible(!dayPickerVisible);
        }
    };

    return (
        <Modal
            show={show}
            title={t('addPurchase.nameDateGroupTitle')}
            closeText={t('addPurchase.save')}
            onClose={() => {
                if (name && date) {
                    console.log('sending', name, date);
                    onSubmit(name, date);
                    setErrors({});
                } else {
                    setErrors({
                        ...errors,
                        name: name ? null : 'error',
                        date: date ? null : 'error',
                    });
                }
            }}
            onCancel={() => {
                onCancel();
            }}
            cancelText={t('addPurchase.cancel')}
        >
            <div className={`${formStyles.fbuForm} ${styles.purchaseNameDateForm}`}>
                <div className={`${formStyles.fbuFormGroup} ${styles.purchaseName}`}>
                    <TextField
                        value={name}
                        placeholder={t('addPurchase.purchaseNamePlaceholder')}
                        className={formStyles.fbuFormField}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        inputRef={nameFieldRef}
                        error={errors['name'] === 'error'}
                    />
                </div>

                <div className={`${formStyles.fbuFormField} ${styles.purchaseDateGroup}`}>
                    <DayPickerInput
                        ref={dayPickerRef}
                        formatDate={simpleFormat}
                        format={SIMPLE_DATE_FORMAT}
                        parseDate={parseDate}
                        value={date}
                        onDayChange={setDate}
                        placeholder={`${simpleFormat(date)}`}
                        keepFocus={false}
                        inputProps={{readOnly: true}}
                        classNames={dayPickerInputClassNames}
                        dayPickerProps={{
                            months: MONTHS,
                            weekdaysLong: DAYS_FULL,
                            weekdaysShort: DAYS_SHORT,
                            firstDayOfWeek: 1
                        }}
                    />
                    <div className={styles.purchaseDateIconWrapper}>
                        <Calendar onClick={toggleDayPicker} className={styles.purchaseDateIcon}/>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PurchaseNameDateGroup;
