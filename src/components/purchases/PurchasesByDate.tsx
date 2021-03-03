import Link from 'next/link';
import { ChevronsLeft, ChevronsRight } from 'react-feather';
import { sub, add } from 'date-fns';
import { PurchaseType } from '../../firebase/model/Purchase';
import PurchasesTable from './PurchasesTable';
import { parseDate, SIMPLE_DATE_FORMAT, simpleFormat } from '../../utils/dateUtils';

import styles from './styles/purchasesTable.module.scss';

export type PurchasesByDateProps = {
    date: string;
    purchases: PurchaseType[];
    deselectDate: () => void;
    selectDate: (date) => void;
}

const PurchasesByDate = ({date, purchases, selectDate, deselectDate, highlight = undefined }) => {
    console.log('listing purchases', date, purchases);
    const dt = parseDate(date, SIMPLE_DATE_FORMAT);
    const prevDate = sub(dt, { days: 1 });
    const nextDate = add(dt, { days: 1 });

    const prevDateShort = simpleFormat(prevDate).split('.', 2).join('.');
    const nextDateShort = simpleFormat(nextDate).split('.', 2).join('.');

    return (
        <div className={styles.purchasesTableContainer}>
            <div className={styles.purchasesTableHeader}>
                <a onClick={() => { selectDate(prevDate); }}>
                    <div className={styles.navItem}>
                        <ChevronsLeft
                            width={20}
                            height={20}
                            className={styles.navIcon}
                        />
                        {prevDateShort}
                    </div>
                </a>
                <div className={styles.navTitleGroup}>
                    <a onClick={deselectDate}>Se alle</a>
                    <h1>{date}</h1>
                </div>
                <a onClick={() => { selectDate(nextDate); }}>
                    <div className={styles.navItem}>
                        {nextDateShort}
                        <ChevronsRight
                            width={20}
                            height={20}
                            className={styles.navIcon}
                        />
                    </div>
                </a>
            </div>
            <PurchasesTable purchases={purchases}/>
        </div>
    );
};

export default PurchasesByDate;
