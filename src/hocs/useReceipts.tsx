import { useContext, useEffect, useState } from 'react';
import { UploadTask } from '@firebase/storage-types';
import { PouchDB } from 'react-pouchdb';
import { PouchDBContext } from '../uiContexts';
import { ImageData } from '../components/common/media/ImageHandler';
import { FireContext, UserContext } from '../contexts';

import { base64ToBlob, getContentType } from '../utils/imgUtils';
import { Receipt, ReceiptStatus } from '../firebase/model/Purchase';
import { DATABASE_RECEIPTS, POUCH_DATABASES } from '../uiConfig';
import usePouch from '../pouchdb/usePouch';

const useReceipts = () => {
    const {ready, getDB} = usePouch({dbNames: POUCH_DATABASES}); // useContext(PouchDBContext);
    const {storage, firestore} = useContext(FireContext);
    const {userInfo} = useContext(UserContext);

    const [receiptsDB, setReceiptsDB] = useState<PouchDB.Database>();

    useEffect(() => {
        if (ready) {
            const rdb = getDB(DATABASE_RECEIPTS);
            console.log('receipts db: ', rdb);
            setReceiptsDB(rdb);
        }
    }, [ready]);

    useEffect(() => {
        if (receiptsDB) {
            console.log('receipts db should be ready for use now');
        }
    }, [receiptsDB]);

    const saveImageBlobToPouchDB = (id: string, name: string, image: Blob) => {
        return receiptsDB.put({
            _id: id,
            _attachments: {
                [name]: {
                    data: image,
                    content_type: getContentType(name),
                }
            }
        });
    };

    const saveImageUrlToPouchDB = (id: string, name: string, image: ImageData, type: string) => {
        const rootRef = storage.ref();
        if (rootRef) {
            const receiptRef = rootRef.child(`/users/${userInfo.userName}/receipts/${id}`);
            receiptRef.putString(`data:${type};base64,${image}`, 'data_url')
                .then(snapShot => {
                    console.log('bytes transferred', snapShot.bytesTransferred);
                    console.log('total bytes', snapShot.totalBytes);
                    console.log('ref', snapShot.ref);
                })
                .catch(err => console.log(err));
        } else {
            console.log('rootRef is null!!');
        }
        return receiptsDB.put({
            _id: id,
            _attachments: {
                [name]: {
                    content_type: 'image/png',
                    data: image,
                }
            }
        });
    };

    const uploadToFireStorage = (
        purchaseId: string,
        receiptId: string,
        imageData: Blob,
        contentType: string,
    ): UploadTask => {
        const rootRef = storage.ref();
        if (rootRef) {
            const receiptRef = rootRef.child(`/users/${userInfo.userName}/receipts/${purchaseId}/${receiptId}`);
            return receiptRef.put(imageData, {contentType});
        } else {
            throw new Error('Root-ref is null');
        }
    };

    const uploadDataUrlToFireStorage = (id: string, name: string, imageUrl: string) => {
        const rootRef = storage.ref();
        if (rootRef) {
            const receiptRef = rootRef.child(`/users/${userInfo.userName}/receipts/${id}`);
            return receiptRef.putString(imageUrl, 'data_url');
        }
    };

    const getAttachment = (id: string, name: string) =>
        receiptsDB.getAttachment(id, name);

    const getReceiptWithImageUrl = async (id: string, name: string) => {
        const doc = await receiptsDB.get(id, {attachments: true});
        const attachmens = doc._attachments;

        const att = attachmens[name];
        return {
            id,
            name,
            ...att,
            previewUrl: `data:${att.content_type};base64, ${att.data}`,
        };
    };

    const getReceiptsFromPouchDB = async (id: string): Promise<Receipt[]> => {
        const doc = await receiptsDB.get(id, {attachments: true});
        const attachments = doc._attachments;

        return attachments ?
            Object.keys(attachments)
                .map(key => {
                    const {data, content_type} = attachments[key];
                    const blob = base64ToBlob(data, content_type);
                    return {
                        attachmentId: key,
                        name: key,
                        contentType: content_type,
                        blob,
                    }
                })
            : [];
    };

    // note: it might be easier to call getAttachment() here
    // but then we lose the content_type info from the returned blob
    const getReceiptFromPouchDB = (id: string, name: string) =>
        getReceiptsFromPouchDB(id)
            .then(receipts => receipts.find(att => att.name === name));


    const notifyReceipt = (purchaseId, receiptId, metadata) => {
        const path = `/users/${userInfo.userName}/receipts/${purchaseId}`;
        return firestore.doc(path)
            .set({
                receiptId,
                receiptMetadata: metadata,
            })
    };

    return {
        saveImageBlobToPouchDB,
        saveImageUrlToPouchDB,
        uploadToFireStorage,
        uploadDataUrlToFireStorage,
        getReceiptFromPouchDB,
        notifyReceipt,
        getReceiptWithImageUrl,
    }
};

export default useReceipts;
