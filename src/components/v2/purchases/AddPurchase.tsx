import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import uuid from 'uuid';
import useReceipts from '../../../hocs/useReceipts';
import { ItemType, PurchaseStatus, PurchaseType, ReceiptInfo, ReceiptStatus } from '../../../firebase/model/Purchase';
import AddPurchaseTitleZone from './AddPurchaseTitleZone';
import AddItemLeader from './AddItemLeader';
import ReceiptPreviews from './ReceiptPreviews';
import usePurchases from '../../../hocs/usePurchases';
import { useRouter } from 'next/router';
import { LayoutContext } from '../../../uiContexts';
import { ArrowLeft } from 'react-feather';
import { DASHBOARD_TABS, PATHS, TABS_PARAMS } from '../../../uiConfig';
import { getContentType } from '../../../utils/imgUtils';

import headerStyles from '../../layout/styles/header.module.scss';
import styles from './styles/editPurchase.module.scss';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import FullscreenLoader from '../../common/FullscreenLoader';
import Loader from '../../common/Loader';
import ItemsTable from './ItemsTable';

export type AddPurchaseProps = {
    onDate: string;
};

const INIT_STATE: PurchaseType = {
    name: '',
    purchaseDate: null,
    status: PurchaseStatus.CREATED,
    receipts: null,
};

const AddPurchase = ({onDate}: AddPurchaseProps) => {
    const router = useRouter();
    const {t} = useTranslation('purchases');
    const [values, setValues] = useState<PurchaseType>(INIT_STATE);
    const {saveImageBlobToPouchDB, uploadToFireStorage, notifyReceipt} = useReceipts();
    const {initPurchase, editPurchase} = usePurchases();
    const {setHeaderContent} = useContext(LayoutContext);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [loaderMessage, setLoaderMessage] = useState<string>('');

    useEffect(() => {
        setHeaderContent(
            <div className={headerStyles.headerComponentWrapper}>
                <div className={headerStyles.leftSection}>
                    <a
                        className={headerStyles.actionLink}
                        onClick={() => {
                            cleanup();
                            router.push(`${PATHS.DASHBOARD}?${TABS_PARAMS.SELECTED_TAB}=${DASHBOARD_TABS.ENTRIES}`)
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
        const highlightParam = highlight ? `&highlight=${highlight}` : '';
        console.log(`Purchase ${highlight} should be listed and highlighted`);
        router.push(`/dashboard/Dashboard?selectedTab=entries${highlightParam}`);
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
                        const metadata = {bucket, fullPath, name};
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

    const savePurchaseByReceipts = () => {
        if (values.receipts && Array.isArray(values.receipts) && (values.receipts.length > 0)) {
            savePurchaseByReceipt(values.receipts[0]);
        } else {
            console.log('Upload at least one receipt first');
        }
    };

    // ToDo: when we support manual additions again..
    const onItemUpdate = (item: ItemType, newValue: number) => {
        // do nothing for now..
        // <AddItemLeader onAddItemClick={onAddItemClick}/>
    };

    return (
        <div className={styles.addPurchase}>
            <div>
                {!values.receipts &&
                <AddPurchaseTitleZone
                    updateField={updateField}
                    name={values.name}
                    date={values.purchaseDate}
                    receipts={values.receipts}
                    onAddReceipt={onAddReceipt}
                />
                }
                {(!values.items && !values.receipts) &&
                <ItemsTable items={values.items} onItemUpdate={onItemUpdate}/>
                }
                {values.receipts && Array.isArray(values.receipts) && (values.receipts.length > 0) &&
                <ReceiptPreviews receipts={values.receipts}/>
                }
            </div>
            <div className={styles.footerZone}>
                <button
                    className={'ssb-btn primary-btn'}
                    disabled={!values.receipts || (values.receipts.length < 1)}
                    onClick={savePurchaseByReceipts}
                >
                    {t('addPurchase.save')}
                </button>
            </div>
            <FullscreenLoader
                show={showLoader}
                loaderMessage={loaderMessage}/>
        </div>
    );
};

export default AddPurchase;
