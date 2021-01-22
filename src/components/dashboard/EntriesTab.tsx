import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Camera, Edit } from 'react-feather';
import styles from '../../pages/dashboard/dashboard.module.scss';
import PurchasesList from '../purchases/PurchasesList';
import PurchasesByDate from '../purchases/PurchasesByDate';
import usePurchases from '../../mock/usePurchases';
import { useEffect, useState } from 'react';
import ConsumptionChart from '../purchases/ConsumptionChart';
import FloatingButton, { ChildMenuProps } from '../common/buttons/FloatingButton';
import DiaryViz from './DiaryViz';
import { getModifiers, surveyEnd, surveyStart } from '../../uiConfig';
import { FLOATING_BTN_OPTIONS } from './HomeTab';
import { simpleFormat } from '../../utils/dateUtils';

const EntriesTab = ({dateSelection, selectDate, deselectDate, onDayClick}) => {
    const {t} = useTranslation('dashboard');
    const router = useRouter();
    const {purchases, purchasesByDate} = usePurchases();

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
        const purchasesDisp = dateSelection ? purchasesByDate[dateSelection] : purchases;
        console.log('should show', purchases);

        setEntriesComp(
            dateSelection ? (
                <PurchasesByDate
                    date={dateSelection}
                    purchases={purchasesDisp}
                    deselectDate={deselectDate}
                    selectDate={selectDate}
                />
            ) : (
                <>
                    <h1>{t('entries.title')}</h1>
                    <DiaryViz
                        renderDay={onDayClick}
                        modifiers={getModifiers(purchases)}
                        surveyStart={simpleFormat(surveyStart)}
                        surveyEnd={simpleFormat(surveyEnd)}
                        className={styles.dashboardDiary}
                    />
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
