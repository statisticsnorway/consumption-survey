import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Camera, Edit3 } from 'react-feather';
import { INPUT_CHANGE_HANDLER } from '../../../uiConfig';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ReceiptInfo } from '../../../firebase/model/Purchase';
import { DAYS_FULL, DAYS_SHORT, MONTHS, parseDate, SIMPLE_DATE_FORMAT, simpleFormat } from '../../../utils/dateUtils';
import ReceiptPopup from './ReceiptPopup';

import styles from './styles/editPurchase.module.scss';
import daypickerStyles from './styles/daypicker.module.scss';
import DayPickerInput from 'react-day-picker/DayPickerInput';

const noBorderStyles = makeStyles({
    root: {
        '& .MuiInputBase-root': {
            border: '0'
        }
    }
});

export type AddPurchaseTitleZoneProps = {
    name: string;
    date: string;
    receipts: ReceiptInfo[];
    onAddReceipt: (imageName: string, image: Blob) => void;
    updateName: (newName: string) => void;
    updateDate: (newDate: Date) => void;
};

const dayPickerInputClassNames = {
    container: daypickerStyles.dayPickerInput,
    overlayWrapper: daypickerStyles.dayPickerOverlayWrapper,
    overlay: daypickerStyles.dayPickerOverlay,

    day: daypickerStyles.dayPickerDay,
    caption: daypickerStyles.dayPickerCaption,
    selected: daypickerStyles.dayPickerSelected,
    today: daypickerStyles.dayPickerToday,
};

const AddPurchaseTitleZone = ({
                                  name, date,
                                  updateName, updateDate,
                                  receipts, onAddReceipt
                              }: AddPurchaseTitleZoneProps) => {
    const {t} = useTranslation('purchases');
    const mediaInputRef = useRef(null);
    const [showReceiptPopup, setShowReceiptPopup] = useState<boolean>(false);
    const dayPickerRef = useRef(null);

    const classes = noBorderStyles();

    const onFileSelected = async (e) => {
        const image = e.target.files[0];
        onAddReceipt(image.name, image);
    };

    console.log(date);
    console.log(new Date(date));
    console.log(Date.parse(date));

    return (
        <div className={styles.titleZone}>
            <div className={styles.nameAndDate}>
                <DayPickerInput
                    ref={dayPickerRef}
                    formatDate={simpleFormat}
                    format={SIMPLE_DATE_FORMAT}
                    parseDate={parseDate}
                    value={new Date(date)}
                    onDayChange={(newDate) => { updateDate(newDate); }}
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

                <TextField
                    value={name}
                    onChange={(e) => { updateName(e.target.value); }}
                    placeholder={t('addPurchase.purchaseName.placeholder')}
                    className={classes.root}
                />
            </div>

            <div className={styles.receipts}>
                <div className={styles.placeHolder}>
                    {!receipts &&
                    <>
                        <input
                            ref={mediaInputRef}
                            type="file"
                            accept="image/*;capture=camera"
                            style={{display: 'none'}}
                            onChange={onFileSelected}
                        />
                        <Camera
                            className={styles.icon}
                            onClick={() => {
                                mediaInputRef.current && mediaInputRef.current.click()
                            }}
                        />
                    </>
                    }
                    {receipts && Array.isArray(receipts) && (receipts.length >= 1) &&
                    <>
                        <img src={receipts[0].previewUrl} onClick={() => {
                            setShowReceiptPopup(true);
                        }}/>
                        <ReceiptPopup
                            show={showReceiptPopup}
                            receipt={receipts[0]}
                            onClose={() => {
                                setShowReceiptPopup(false);
                            }}
                            onCancel={() => {
                                setShowReceiptPopup(false);
                            }}
                        />
                    </>
                    }
                </div>
            </div>
        </div>
    );
};

export default AddPurchaseTitleZone;
