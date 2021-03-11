import { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Check, Save, Trash2 } from 'react-feather';
import usePurchases from '../../../hocs/usePurchases';
import { ItemType, PurchaseStatus, PurchaseType } from '../../../firebase/model/Purchase';
import { LineItem, OcrResults, ReceiptScanResult } from '../../../firebase/model/Veryfi';
import { OCR_DATE_FORMAT, parseDate } from '../../../utils/dateUtils';
import { LayoutContext } from '../../../uiContexts';
import AddPurchaseTitleZone from './AddPurchaseTitleZone';
import ItemsTable from './ItemsTable';
import Loader from '../../common/Loader';
import useReceipts from '../../../hocs/useReceipts';

import headerStyles from '../../layout/styles/header.module.scss';
import styles from './styles/editPurchase.module.scss';
import { DASHBOARD_TABS, PATHS, TABS_PARAMS } from '../../../uiConfig';
import RoundButton from '../../common/buttons/RoundButton';
import FullscreenLoader from '../../common/FullscreenLoader';
import DeletePurchaseDialog from '../../purchases/support/DeletePurchaseDialog';
import useSearchTerms from '../../../hocs/useSearchTerms';

export type EditPurchaseProps = {
    purchaseId: string;
};

const EditPurchase = ({purchaseId}: EditPurchaseProps) => {
    const router = useRouter();
    const {purchases, editPurchase, deletePurchase} = usePurchases();
    const {searchTerms} = useSearchTerms();
    const {getReceiptFromPouchDB, getReceiptWithImageUrl} = useReceipts();
    const {t} = useTranslation('purchases');
    const {setHeaderContent} = useContext(LayoutContext);
    const [editPurchaseHeader, setEditPurchaseHeader] = useState<ReactNode>(null);
    const [purchase, setPurchase] = useState<PurchaseType>(null);
    const [values, setValues] = useState<PurchaseType>(null);
    const [error, setError] = useState<string>(null);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [loaderMessage, setLoaderMesage] = useState<string>(null);
    const [showPurchaseDeleteConfirm, setShowPurchaseDeleteConfirm] = useState<boolean>();

    useEffect(() => {
        if (purchases) {
            const match = purchases.find(p => p.id === purchaseId);
            if (match) {
                setPurchase(match);
            } else {
                setError(`${t('error.purchase.notFound')}`);
            }
        }
    }, [purchases]);

    const showMessage = (msg) => {
        setShowLoader(true);
        setLoaderMesage(msg);
    };

    const clearMessages = () => {
        setShowLoader(false);
        setLoaderMesage(null);
    };

    const extractItems = (lineItems: LineItem[]): ItemType[] => {
        return lineItems.map((li, idx) => ({
            name: li.description,
            qty: li.quantity,
            units: li.unit_of_measure,
            amount: li.price || li.total,
            id: li.id,
            idx,
        }));
    };

    const extractReceipts = (ocrResults: OcrResults): ReceiptScanResult => {
        const receiptKeys = Object.keys(ocrResults);
        return ocrResults[receiptKeys[0]];
    };

    const extractPurchaseInfo = (ocrResults: OcrResults): PurchaseType => {
        const receiptInfo = extractReceipts(ocrResults);
        const {line_items, date, vendor, total} = receiptInfo;

        return {
            name: vendor.name || vendor.raw_name || '??',
            purchaseDate: parseDate(date, OCR_DATE_FORMAT).toISOString(),
            amount: total,
            items: extractItems(line_items),
            status: PurchaseStatus.OCR_COMPLETE,
        };
    };

    useEffect(() => {
        if (purchase) {
            console.log('showing', purchase);
            if ((purchase.status === PurchaseStatus.OCR_COMPLETE) && purchase.ocrResults) {
                console.log('using values from ocr results');
                setValues(extractPurchaseInfo(purchase.ocrResults));
            } else {
                console.log('using values from usePurchase');
                setValues(purchase);
            }

            if (purchase.receipts) {
                purchase.receipts.forEach(r => {
                    console.log('loading image', r.imageId, r.imageName, r.contentType);
                    if (r.imageId && r.imageName) {
                        getReceiptWithImageUrl(r.imageId, r.imageName)
                            .then(withImg => {
                                setValues(prevState => {
                                    const afterImgLoad = {
                                        ...prevState,
                                        receipts: [{ ...r, ...withImg }],
                                    };

                                    console.log('xx prev state', prevState);
                                    console.log('xx new state', afterImgLoad);

                                    return afterImgLoad;
                                });
                            });
                    }
                });
            }

            updateHeader();
        }
    }, [purchase]);

    const updateHeader = () => {
        setEditPurchaseHeader(
            <div className={`${headerStyles.headerComponentWrapper} ${styles.editPurchaseHeader}`}>
                <div className={headerStyles.leftSection}>
                    <a
                        className={headerStyles.actionLink}
                        onClick={() => {
                            router.push(`${PATHS.DASHBOARD}?${TABS_PARAMS.SELECTED_TAB}=${DASHBOARD_TABS.ENTRIES}`);
                        }}
                    >
                        <ArrowLeft width={16} height={16} className={headerStyles.actionIcon}/>
                        <span className={styles.linkText}>{t('back')}</span>
                    </a>
                </div>
                <div className={headerStyles.rightSection}>
                    <RoundButton
                        className={styles.deletePurchaseBtn}
                        onClick={() => {
                            setShowPurchaseDeleteConfirm(true);
                        }}
                    >
                        <Trash2 className={styles.icon}/>
                    </RoundButton>
                    {(purchase.status === PurchaseStatus.OCR_COMPLETE) &&
                    <RoundButton
                        className={styles.approveOcrBtn}
                        onClick={approveOcrResults}
                    >
                        <Check className={styles.icon}/>
                    </RoundButton>
                    }
                    {(purchase.status === PurchaseStatus.COMPLETE) &&
                    <RoundButton
                        className={styles.saveChangesBtn}
                        onClick={() => {
                            savePurchase({status: PurchaseStatus.COMPLETE});
                        }}
                    >
                        <Save className={styles.icon}/>
                    </RoundButton>
                    }
                </div>
            </div>
        );
    };

    const updateField = (fieldName: keyof PurchaseType) => (e: ChangeEvent<HTMLInputElement>) => {
        console.log('should change field', fieldName, e.target.value);
        setValues({
            ...values,
            [fieldName]: e.target.value,
        });
    };

    useEffect(() => {
        if (values) {
            updateHeader();
        } else {
            setEditPurchaseHeader(null);
        }
    }, [values]);

    useEffect(() => {
        setHeaderContent(editPurchaseHeader);
    }, [editPurchaseHeader]);

    const removeItem = (item) => {
        const {idx, id} = item;
        const {items, amount} = values;
        setValues({
            ...values,
            items: items.filter(it =>
                it.id ? (it.id !== id) : (it.idx !== idx)),
            amount: (amount - (Number(item.amount) * Number(item.qty))),
        });
    };

    const approveOcrResults = () => {
        savePurchase({status: PurchaseStatus.COMPLETE});
    };

    const savePurchase = ({status}) => {
        showMessage(t('Lagrer registreringen ...'));
        console.log('wtf is it with receipts and state', values, values.receipts);
        const receiptsForFirebase = values.receipts
            ? values.receipts.map(r => ({
                imageName: r.imageName,
                imageId: r.imageId,
                contentType: r.contentType,
                status: r.status,
            }))
            : null;
        console.log(receiptsForFirebase);
        const newValues = {
            ...values,
            receipts: receiptsForFirebase,
            status: PurchaseStatus.COMPLETE,
        };
        console.log('attempting to save', newValues);
        editPurchase(purchase.id, newValues)
            .then(() => {
                console.log('fb updated');
                clearMessages();
            })
    };

    const onItemQtyChange = (item: ItemType, newQty: number) => {
        if (newQty === 0) {
            console.log('item will be removed');
            removeItem(item);
        } else {
            const itemsUpd = values.items.map(i => {
                const match = (x) =>
                    x.id ? x.id === item.id : x.idx === item.idx;

                return match(i) ? {...i, qty: `${newQty}`} : i;
            });

            const amount = itemsUpd.reduce((acc, item) =>
                acc + (Number(item.amount) * Number(item.qty)), 0);

            setValues({
                ...values,
                items: itemsUpd,
                amount,
            });
        }
    };

    const onItemUpdate = (oldValues: ItemType, newValues: ItemType) => {
      console.log(oldValues, '=>', newValues);
    };

    const clearPurchaseDelete = () => {
        setShowPurchaseDeleteConfirm(false);
    };

    if (!searchTerms || searchTerms.length < 1) {
        return <Loader />;
    };

    return values ? (
        <div className={styles.editPurchase}>
            <AddPurchaseTitleZone
                name={values.name}
                date={values.purchaseDate}
                receipts={values.receipts}
                onAddReceipt={() => { /* TODO */
                }}
                updateField={updateField}
            />
            <ItemsTable
                items={values.items}
                onItemQtyChange={onItemQtyChange}
                onItemUpdate={onItemUpdate}
            />
            <FullscreenLoader show={showLoader} loaderMessage={loaderMessage}/>
            <DeletePurchaseDialog
                purchase={purchase}
                show={showPurchaseDeleteConfirm}
                onConfirm={() => {
                    deletePurchase(purchase)
                        .then(res => {
                            console.log('Purchase deleted', purchase);
                            clearPurchaseDelete();
                            router.push(PATHS.DASHBOARD);
                        });
                }}
                onCancel={clearPurchaseDelete}
            />
        </div>
    ) : <Loader/>;
};

export default EditPurchase;
