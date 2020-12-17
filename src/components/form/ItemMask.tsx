import { useTranslation } from 'react-i18next';
import Autocomplete from 'react-autocomplete'
import NumberFormat from 'react-number-format';
import { Check, MinusCircle, X, } from 'react-feather';
import TextField, { AdornmentPosition } from './TextField';

import styles from './itemMask.module.scss';
// import useSearchTerms from '../../hocs/useSearchTerms';
import useSearchTerms from '../../mock/useSesarchTerms';

type ItemMaskProps = {
    name: string;
    qty: string;
    units: string;
    price: string;
    onComplete: (name, qty, units, price) => void;
    onNameChange: (newVal: string) => void;
    onQtyChange: (newVal: string) => void;
    onUnitsChange: (newVal: string) => void;
    onPriceChange: (newVal: string) => void;
    clear: () => void;
    className?: string;
};

const ItemMask = ({
                      name, qty, units, price,
                      onNameChange, onQtyChange, onUnitsChange, onPriceChange,
                      onComplete, clear,
                      className
                  }: ItemMaskProps) => {
    const {t} = useTranslation('purchases');
    const {searchTerms} = useSearchTerms();

    const nf = (
        <NumberFormat
            defaultValue="0,00"
            value={price}
            onChange={(e) => {
                onPriceChange(e.target.value);
            }}
            className={styles.priceField}
            size={10}
            thousandSeparator="."
            decimalSeparator=","
            suffix=" kr."
            allowEmptyFormatting={true}
        />
    );

    return (
        <div className={`${styles.itemMaskContainer} ${className || ''}`}>
            <Autocomplete
                inputProps={{
                    placeholder: t('addPurchase.itemName.placeholder'),
                    className: styles.nameField
                }}
                value={name}
                wrapperStyle={{position: 'relative'}}
                onChange={(e, value) => {
                    onNameChange(value);
                }}
                items={searchTerms}
                renderMenu={(items, value, style) =>
                    (items && (items.length > 0)) ? (
                        <div className={styles.searchTerms} children={items}/>
                    ) : (
                        <></>
                    )
                }
                shouldItemRender={(item, value) =>
                    item.text.toLowerCase().indexOf(value.toLowerCase()) > -1
                }
                renderItem={(item, highlighted) => (
                    <div>{item.text}</div>
                )}
                onSelect={(value, item) => {
                    onNameChange(value);
                    onUnitsChange(item.unit);
                }}
                getItemValue={(item) => {
                    return item.text;
                }}
            />
            <TextField
                id="newItem-qty"
                value={qty}
                size={4}
                placeholder="1"
                onChange={onQtyChange}
                className={styles.qtyField}
                inputStyle={{border: '0'}}
            />
            <TextField
                id="newItem-price"
                value={price}
                placeholder="0,00"
                onChange={onPriceChange}
                adornment="kr."
                className={styles.priceField}
                adornmentPosition={AdornmentPosition.Suffix}
                inputStyle={{border: '0'}}
            />

            <span className={`${styles.itemMaskAction} ${styles.addItemIcon}`}>
                <Check onClick={() => {
                    onComplete(name, qty, units, price);
                    clear();
                }}/>
            </span>
            <span className={`${styles.itemMaskAction} ${styles.cancelItemIcon}`}>
            <MinusCircle
                onClick={() => {
                    clear();
                }}
                style={{width: '1rem', height: '1rem'}}
            />
            </span>
        </div>
    );
};

export default ItemMask;
