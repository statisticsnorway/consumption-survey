import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import Modal from '../common/dialog/Modal';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { parseDate, SIMPLE_DATE_FORMAT, simpleFormat } from '../../utils/dateUtils';
import { Calendar } from 'react-feather';

import formStyles from '../form/form.module.scss';
import styles from './styles/addPurchase.module.scss';

export type PurchaseNameDateGroupProps = {
    show: boolean;
    currName: string;
    currDate: Date;
    onSubmit: (name, date) => void;
    onCancel: () => void;
};

const PurchaseNameDateGroup = ({
                                   show,
                                   currName, currDate,
                                   onSubmit,
                                   onCancel
                               }: PurchaseNameDateGroupProps) => {
    const {t} = useTranslation('purchases');
    const [name, setName] = useState(currName);
    const [date, setDate] = useState(currDate);
    const dayPickerRef = useRef(null);
    const [dayPickerVisible, setDayPickerVisible] = useState(false);

    useEffect(() => {
        /** Initial */
        if (!currName) {
            setName(t('addPurchase.'));
        }

        if (!currDate) {
            setDate(new Date());
        }
    }, []);

    useEffect(() => {
        /** Changes from parent */
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
            closeText={t('addPurchase.save')}
            onClose={() => {
                onSubmit(name, date);
            }}
            onCancel={() => {
                onCancel();
            }}
            cancelText={t('addPurchase.cancel')}
        >
            <h2>{t('addPurchase.title')}</h2>
            <div className={`${formStyles.fbuForm} ${styles.purchaseNameDateForm}`}>
                <TextField
                    value={name}
                    label={t('addPurchase.purchaseNameLabel')}
                    placeholder={t('addPurchase.purchaseNamePlaceholder')}
                    className={`${formStyles.fbuFormField} ${styles.purchaseName}`}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />

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
