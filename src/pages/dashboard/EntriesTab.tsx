import { useTranslation } from 'react-i18next';
import styles from './dashboard.module.scss';
import PurchasesList from '../../components/purchases/PurchasesList';
import PurchasesByDate from '../../components/purchases/PurchasesByDate';
import usePurchases from '../../mock/usePurchases';
import { useEffect, useState } from 'react';
import ConsumptionChart from '../../components/purchases/ConsumptionChart';
import FloatingButton, { ChildMenuProps } from '../../components/common/buttons/FloatingButton';
import { FLOATING_BTN_OPTIONS, FLOATING_MENU_OPTIONS } from './HomeTab';
import { useRouter } from 'next/router';
import { Camera, Edit } from 'react-feather';

const EntriesTab = ({dateSelection, selectDate, deselectDate}) => {
    const {t} = useTranslation('dashboard');
    const router = useRouter();
    const {purchasesByDate} = usePurchases();

    const [entriesComp, setEntriesComp] = useState(null);
    const [floatingMenuOptions, setFloatingMenuOptions] = useState<ChildMenuProps[]>();

    const makeMenuOptions = (onDate): ChildMenuProps[] => [
        {
            id: 'registerNew',
            title: t('fab.registerNew'),
            onClick: () => {
                const onDateParam = onDate ? `?onDate=${onDate}` : '';
                router.push(`/purchases/editPurchase${onDateParam}`);
            },
            icon: <Edit/>,
        }, {
            id: 'scanReceipt',
            title: t('fab.scanReceipt'),
            onClick: () => {
                router.push('/purchases/scanReceipt');
            },
            icon: <Camera/>,
        }
    ];

    useEffect(() => {
        setFloatingMenuOptions(makeMenuOptions(dateSelection));
    }, [dateSelection]);

        useEffect(() => {
        const purchases = dateSelection ? purchasesByDate[dateSelection] : null;
        console.log('should show', purchases);

        setEntriesComp(
            dateSelection ? (
                <PurchasesByDate
                    date={dateSelection}
                    purchases={purchases}
                    deselectDate={deselectDate}
                    selectDate={selectDate}
                />
            ) : (
                <>
                    <h1>{t('entries.title')}</h1>
                    <ConsumptionChart/>
                    <div className={styles.entries}>
                        <PurchasesList/>
                    </div>
                </>
            )
        );
    }, [dateSelection]);

    console.log('Entries Tab', dateSelection, purchasesByDate);

    return (
        <>
            {entriesComp}
            <FloatingButton
                mainProps={FLOATING_BTN_OPTIONS}
                childButtonProps={floatingMenuOptions}
                className={styles.floatingAddNew}
            />
        </>
    );
};

export default EntriesTab;
