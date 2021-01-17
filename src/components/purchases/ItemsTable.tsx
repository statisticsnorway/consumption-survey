import { MinusCircle } from 'react-feather';
import { ItemType } from '../../firebase/model/Purchase';

import styles from './styles/itemsTable.module.scss';
import { krCents } from '../../utils/jsUtils';
import NumberStepper from '../common/stepper/NumberStepper';

export type ItemsTableProps = {
    items: ItemType[];
    onItemClick: (item) => void;
    onItemUpdate: (item: ItemType, newQty: number) => void;
    showTotalRow?: boolean;
};

const ItemsTable = ({items, onItemClick, onItemUpdate, showTotalRow = true}: ItemsTableProps) => {
    const renderCell = (item, cellStyle, cellContent) =>
        <td className={cellStyle} onClick={() => onItemClick(item)}>{cellContent}</td>;

    /*
    <th className={`${styles.qtyUnits} header`} colSpan={2}>Mengde</th>
                    {renderCell(item, styles.units, item.units)}

                    <td className={styles.action}>
                        <MinusCircle
                            width={16} height={16}
                            className={styles.actionIcon}
                            onClick={() => { onItemRemove(item); }}
                        />
                    </td>
     */

    const total = items.reduce((acc, item) => acc + (Number(item.amount) * Number(item.qty)), 0);
    const nrItems = items.length;
    const nrItemsText = nrItems === 0 ? '' : `${nrItems} vare${nrItems > 1 ? 'r' : ''}`;

    return (
        <table className={styles.itemsTable} cellSpacing={0} cellPadding={0}>
            <thead>
            <tr>
                <th className={`${styles.name} header`}>Vare</th>
                <th className={`${styles.price} header`}>Pris</th>
                <th className={`${styles.action}`}></th>
            </tr>
            </thead>
            <tbody>
            {items.map((item) => (
                <tr key={item.id || item.idx}>
                    {renderCell(item, styles.name, item.name)}
                    {renderCell(item, styles.price, krCents(item.amount))}
                    <td>
                        <NumberStepper initialValue={Number(item.qty)} onChange={(newValue) => {
                            onItemUpdate(item, newValue);
                        }}/>
                    </td>
                </tr>
            ))}
            {showTotalRow && (items.length > 0) &&
            <>
                <tr key="spacer" className={styles.spacer}>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr key="total" className={styles.totalRow}>
                    <td>
                        Sum
                    </td>
                    <td className={styles.total}>
                        {krCents(total)}
                    </td>
                    <td className={styles.nrItems}>
                        {nrItemsText}
                    </td>
                </tr>
            </>
            }
            </tbody>
        </table>
    );
};

export default ItemsTable;
