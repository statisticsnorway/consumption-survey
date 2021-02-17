import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Camera, Edit } from 'react-feather';
import styles from '../../pages/dashboard/dashboard.module.scss';
import PurchasesList from '../purchases/PurchasesList';
import PurchasesByDate from '../purchases/PurchasesByDate';
import usePurchases from '../../hocs/usePurchases';
// import usePurchases from '../../mock/usePurchases';
import { useContext, useEffect, useState } from 'react';
import ConsumptionChart from '../purchases/ConsumptionChart';
import FloatingButton, { ChildMenuProps } from '../common/buttons/FloatingButton';
import DiaryViz from './DiaryViz';
import { getModifiers } from '../../uiConfig';
import { FLOATING_BTN_OPTIONS } from './HomeTab';
import { simpleFormat } from '../../utils/dateUtils';
import { UserContext } from '../../contexts';

const EntriesTab = ({dateSelection, selectDate, deselectDate, onDayClick}) => {
    const {t} = useTranslation('dashboard');
    const router = useRouter();
    const {purchases, purchasesByDate} = usePurchases();
    const { userInfo: { surveyInfo }} = useContext(UserContext);

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
                    <DiaryViz
                        renderDay={onDayClick}
                        modifiers={getModifiers(purchases, surveyInfo)}
                        surveyStart={simpleFormat(surveyInfo.journalStart)}
                        surveyEnd={simpleFormat(surveyInfo.journalEnd)}
                        className={styles.dashboardDiary}
                    />
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
