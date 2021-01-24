import { compareDesc } from 'date-fns';
import { Edit3, RotateCw } from 'react-feather';
// import usePurchases from '../../hocs/usePurchases';
import usePurchases from '../../mock/usePurchases';
// import useExpenses from '../../hocs/useExpenses';
import useExpenses from '../../mock/useExpenses';
import { PurchaseType } from '../../firebase/model/Purchase';
import { RegularExpenseType } from '../../firebase/model/RegularExpense';
import { dateFormatDayDate, parseDate, simpleFormat } from '../../utils/dateUtils';

import styles from './registrations.module.scss';
import { krCents } from '../../utils/jsUtils';
import { PATHS } from '../../uiConfig';
import { useRouter } from 'next/router';

export type RecentRegistrationsProps = {
    limit: number;
};

export type WithRegisteredTime = object & {
    registeredTime?: string;
};

export const registeredTimeComparator = (a: WithRegisteredTime, b: WithRegisteredTime) =>
    compareDesc(Date.parse(a.registeredTime), Date.parse(b.registeredTime));

export const isPurchase = (reg: PurchaseType | RegularExpenseType) => {
    return 'purchaseDate' in reg;
};

export const getPurchaseDate = (reg: PurchaseType) => reg.purchaseDate;

const dateDisp = (date) => {
    const [dt, day] =
        dateFormatDayDate(parseDate(simpleFormat(date)))
            .split('.');

    return (
        <div className={styles.purchaseDate}>
            <span className={styles.purchaseDateDay}>{day.toLowerCase()}</span>
            <span className={styles.purchaseDateDate}>{dt}</span>
        </div>
    );
};

const RecentRegistrations = ({limit = 5}: RecentRegistrationsProps) => {
    const router = useRouter();
    const {purchases} = usePurchases();
    const {expenses} = useExpenses();

    const allRegs = [
        ...purchases.sort(registeredTimeComparator)
            .slice(0, limit),
        ...expenses.sort(registeredTimeComparator)
            .slice(0, limit),
    ];

    const recents = allRegs
        .sort(registeredTimeComparator)
        .slice(0, limit);

    console.log('recents', recents);

    const goToReg = (reg: PurchaseType | RegularExpenseType) => {
        if (isPurchase(reg)) {
            router.push(`${PATHS.EDIT_PURCHASE}?purchaseId=${reg.id}`);
        } else {
            console.log('handle regular expense');
        }
    };

    return (
        <div className={styles.regList}>
            {recents
                .map((reg: PurchaseType | RegularExpenseType) => {
                    console.log('processing', reg,
                        'isP', isPurchase(reg),
                        'dt', isPurchase(reg) ? (reg as PurchaseType).purchaseDate : 'fast');
                    return (
                        <div className={styles.reg}>
                            {isPurchase(reg) ?
                                dateDisp(Date.parse((reg as PurchaseType).purchaseDate)) :
                                <RotateCw width={20} height={16} className={styles.fastIcon}/>
                            }
                            <div className={styles.regInfo} onClick={() => { goToReg(reg); }}>
                                <div className={styles.nameAmount}>
                                    <span className={styles.name}>{reg.name}</span>
                                    <span className={styles.amount}>{krCents(reg.amount)}</span>
                                </div>
                                <Edit3 className={styles.edit} width={20} height={20} />
                            </div>
                        </div>
                    );
                })}
        </div>);
};

export default RecentRegistrations;
