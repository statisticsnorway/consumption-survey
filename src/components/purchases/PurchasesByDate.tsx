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

const PurchasesByDate = ({date, purchases, selectDate, deselectDate }) => {
    console.log('listing purchases', date, purchases);
    const dt = parseDate(date, SIMPLE_DATE_FORMAT);
    const prev = simpleFormat(sub(dt, {days: 1}));
    const next = simpleFormat(add(dt, {days: 1}));

    return (
        <div className={styles.purchasesTableContainer}>
            <div className={styles.purchasesTableHeader}>
                <a onClick={() => { selectDate(prev); }}>
                    <div className={styles.navItem}>
                        <ChevronsLeft width={20} height={20} className={styles.navIcon}/>
                        {prev}
                    </div>
                </a>
                <div className={styles.navTitleGroup}>
                    <a onClick={deselectDate}>Se alle</a>
                    <h1>{date}</h1>
                </div>
                <a onClick={() => { selectDate(prev); }}>
                    <div className={styles.navItem}>
                        {next}
                        <ChevronsRight width={20} height={20} className={styles.navIcon}/>
                    </div>
                </a>
            </div>
            <PurchasesTable purchases={purchases}/>
        </div>
    );
};

export default PurchasesByDate;