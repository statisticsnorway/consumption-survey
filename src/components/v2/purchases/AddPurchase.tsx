import { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import uuid from 'uuid';
import useReceipts from '../../../hocs/useReceipts';
import { ItemType, PurchaseStatus, PurchaseType, ReceiptInfo, ReceiptStatus } from '../../../firebase/model/Purchase';
import AddPurchaseTitleZone from './AddPurchaseTitleZone';
import ReceiptPreviews from './ReceiptPreviews';
import usePurchases from '../../../hocs/usePurchases';
import { useRouter } from 'next/router';
import { LayoutContext } from '../../../uiContexts';
import { ArrowLeft, Save } from 'react-feather';
import { DASHBOARD_TABS, PATHS, TABS_PARAMS } from '../../../uiConfig';
import { getContentType } from '../../../utils/imgUtils';

import headerStyles from '../../layout/styles/header.module.scss';
import styles from './styles/editPurchase.module.scss';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import FullscreenLoader from '../../common/FullscreenLoader';
import ItemsTable from './ItemsTable';
import { AddPurchaseErrors } from '../../../firebase/model/errors';
import useSearchTerms from '../../../hocs/useSearchTerms';
import Loader from '../../common/Loader';

export type AddPurchaseProps = {
    onDate: string;
    startScan?: boolean;
};


const INIT_STATE: PurchaseType = {
    name: '',
    purchaseDate: new Date().toISOString(),
    status: PurchaseStatus.CREATED,
    receipts: null,
    items: null,
};

const AddPurchase = ({onDate, startScan = true}: AddPurchaseProps) => {
    const router = useRouter();
    const {t} = useTranslation('purchases');
    const {searchTerms, searchTermsErrors} = useSearchTerms();
    const [values, setValues] = useState<PurchaseType>(INIT_STATE);
    const {saveImageBlobToPouchDB, uploadToFireStorage, notifyReceipt} = useReceipts();
    const {addPurchase, initPurchase, editPurchase} = usePurchases();
    const {setHeaderContent} = useContext(LayoutContext);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [loaderMessage, setLoaderMessage] = useState<string>('');
    const [errors, setErrors] = useState<AddPurchaseErrors>({} as AddPurchaseErrors);

    useEffect(() => {
        setHeaderContent(
            <div
                className={headerStyles.headerComponentWrapper}
                style={{justifyContent: 'flex-start'}}
            >
                <div className={headerStyles.leftSection}>
                    <a
                        className={headerStyles.actionLink}
                        onClick={() => {
                            cleanup();
                            router.push(PATHS.PURCHASES);
                        }}
                    >
                        <ArrowLeft width={16} height={16} className={headerStyles.actionIcon}/>
                        <span className={styles.linkText}>{t('back')}</span>
                    </a>
                </div>
                <div className={headerStyles.rightSection}>
                    <h3>{t('addPurchase.title')}</h3>
                </div>
            </div>
        );
    }, []);

    const updateField = (fieldName: keyof PurchaseType) => (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [fieldName]: e.target.value,
        });
    };

    const onAddItemClick = () => {
        console.log('add an item manually');
    };

    const clearMessages = () => {
        setShowLoader(false);
        setLoaderMessage('');
    };

    const showMessage = (msg) => {
        setShowLoader(true);
        setLoaderMessage(msg);
    };

    const onAddReceipt = (imageName: string, image: Blob) => {
        const imageId = uuid();
        showMessage(t('addPurchase.progress.saveImage'));
        saveImageBlobToPouchDB(imageId, imageName, image)
            .then(async res => {
                console.log('image stored locally');
                const newList: ReceiptInfo[] = (values.receipts || []);
                newList
                    .push({
                        imageId,
                        imageName,
                        image,
                        contentType: getContentType(imageName),
                        previewUrl: URL.createObjectURL(image),
                        status: ReceiptStatus.CREATED,
                    });
                setValues({
                    ...values,
                    receipts: newList,
                });
                clearMessages();
            })
    };

    // update image previews
    useEffect(() => {
        if (values.receipts) {

        }
    }, [values.receipts]);

    const cleanup = () => {
        setHeaderContent(null);
        clearMessages();
    };

    const onSuccessfulAdd = ({highlight}) => {
        cleanup();
        const highlightParam = highlight ? `highlight=${highlight}` : '';
        console.log(`Purchase ${highlight} should be listed and highlighted`);
        router.push(`${PATHS.PURCHASES}?${highlightParam}`);
    };

    const savePurchaseByReceipt = (receipt: ReceiptInfo) => {
        const {imageName, image, contentType, imageId, status} = receipt;
        showMessage(t('addPurchase.progress.uploadReceipt'));
        initPurchase()
            .then(docRef => {
                uploadToFireStorage(
                    docRef.id,
                    imageName,
                    image,
                    contentType
                )
                    .then((uploadSnapshot: UploadTaskSnapshot) => {
                        console.log('upload details', uploadSnapshot);
                        const {bucket, fullPath, name} = uploadSnapshot.metadata;
                        const metadata = {bucket, fullPath, name, contentType};
                        console.log('metadata', metadata);

                        notifyReceipt(docRef.id, imageName, metadata)
                            .then((rcptSnap) => {
                                console.log('notification EP setup .. check CF', rcptSnap);
                                editPurchase(docRef.id, {
                                    status: PurchaseStatus.OCR_IN_PROGRESS,
                                    // Todo: Rename this to 'receiptsMeta'
                                    receipts: [{imageName, contentType, imageId, status}]
                                })
                                    .then(() => {
                                        onSuccessfulAdd({highlight: docRef.id});
                                    })
                            })
                    })
            });
    };

    const validate = () => {
        const err = {
            name: values.name ? null : 'error',
            purchaseDate: values.purchaseDate ? null : 'error',
            items: (values.items && values.items.length > 0) ? null : 'error',
        };

        setErrors(err);

        return Object.keys(err)
            .reduce((acc, key) => acc && err[key] !== 'error', true);
    };

    const savePurchase = () => {
        if (validate()) {
            const amount = values.items.reduce((acc, item) =>
                acc + Number(item.qty) * Number(item.amount), 0);
            addPurchase({
                ...values,
                amount,
                status: PurchaseStatus.COMPLETE
            })
                .then((docRef) => {
                    console.log('item added', docRef);
                    onSuccessfulAdd({highlight: docRef.id});
                });
        }
    };

    const savePurchaseByReceipts = () => {
        if (values.receipts && Array.isArray(values.receipts) && (values.receipts.length > 0)) {
            savePurchaseByReceipt(values.receipts[0]);
        } else {
            console.log('Upload at least one receipt first');
        }
    };

    // ToDo: when we support manual additions again..
    const onItemQtyChange = (item: ItemType, newValue: number) => {
        // do nothing for now..
        // <AddItemLeader onAddItemClick={onAddItemClick}/>
    };

    const onItemUpdate = (oldValues: ItemType, newValues: ItemType) => {
        const itemsUpd = values.items.map(i => {
            const match = (x) =>
                x.idx === oldValues.idx;

            return match(i) ? newValues : i;
        });

        setValues({
            ...values,
            items: itemsUpd,
        });
    };

    const onItemAdd = (newItem: ItemType) => {
        const currItems = values.items || [];
        setValues({
            ...values,
            items: [
                ...currItems,
                {...newItem, idx: currItems.length},
            ],
        });
    };

    if (searchTermsErrors) {
        return (
            <>
                Could not load searchTerms.
                <a
                    onClick={() => {
                        window.location.reload();
                    }}
                    style={{color: 'green'}}
                >
                    Try again
                </a>
            </>
        );
    }

    if (!searchTerms || searchTerms.length <= 0) {
        return <Loader/>;
    }

    return (
        <div className={styles.addPurchase}>
            {!values.receipts &&
            <div>
                <AddPurchaseTitleZone
                    name={values.name}
                    date={values.purchaseDate}
                    receipts={values.receipts}
                    onAddReceipt={onAddReceipt}
                    updateName={(newName) => {
                        setValues({
                            ...values,
                            name: newName,
                        });
                    }}
                    updateDate={(newDate) => {
                        setValues({
                            ...values,
                            purchaseDate: newDate.toISOString(),
                        });
                    }}
                    errors={errors}
                    launchCamera={startScan}
                />
                <ItemsTable
                    items={values.items}
                    onItemQtyChange={onItemQtyChange}
                    onItemUpdate={onItemUpdate}
                    onNewItem={onItemAdd}
                />
            </div>
            }
            {values.receipts && Array.isArray(values.receipts) && (values.receipts.length > 0) &&
            <>
                <ReceiptPreviews receipts={values.receipts} showAddReceipt={false}/>
                <button
                    className={'ssb-btn primary-btn'}
                    disabled={!values.receipts || (values.receipts.length < 1)}
                    onClick={savePurchaseByReceipts}
                >
                    {t('addPurchase.saveByReceipt')}
                </button>
                <div className={styles.startScanLeader}>
                    {t('addPurchase.receiptScanning.start')}
                </div>
            </>
            }
            {!values.receipts && Array.isArray(values.items) && (values.items.length > 0) &&
            <button
                className={'ssb-btn primary-btn'}
                disabled={!values.items || (values.items.length < 1)}
                onClick={savePurchase}
            >
                {t('addPurchase.save')}
            </button>
            }
            <div className={styles.footerZone}>

            </div>
            <FullscreenLoader
                show={showLoader}
                loaderMessage={loaderMessage}/>
        </div>
    );
};

export default AddPurchase;
