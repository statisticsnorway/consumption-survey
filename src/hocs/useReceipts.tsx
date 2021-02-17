import { useContext } from 'react';
import { PouchDBContext } from '../uiContexts';
import { ImageData } from '../components/common/media/ImageHandler';
import { FireContext, UserContext } from '../contexts';
import { UploadTask } from '@firebase/storage-types';

const useReceipts = () => {
    const {db} = useContext(PouchDBContext);
    const {storage} = useContext(FireContext);
    const {userInfo} = useContext(UserContext);

    const saveReceiptString = (id: string, name: string, image: ImageData) => {
        const rootRef = storage.ref();
        if (rootRef) {
            const receiptRef = rootRef.child(`/users/${userInfo.userName}/receipts/${id}`);
            receiptRef.putString(`data:image/png;base64,${image}`, 'data_url')
                .then(snapShot => {
                    console.log('bytes transferred', snapShot.bytesTransferred);
                    console.log('total bytes', snapShot.totalBytes);
                    console.log('ref', snapShot.ref);
                })
                .catch(err => console.log(err));
        } else {
            console.log('rootRef is null!!');
        }
        return db.put({
            _id: id,
            _attachments: {
                [name]: {
                    content_type: 'image/png',
                    data: image,
                }
            }
        });
    };

    const saveReceiptBlob = (id: string, name: string, imageData: Blob, contentType: string): UploadTask => {
        const rootRef = storage.ref();
        if (rootRef) {
            const receiptRef = rootRef.child(`/users/${userInfo.userName}/receipts/${id}`);
            return receiptRef.put(imageData, { contentType });
        } else {
            throw new Error('Root-ref is null');
        }
    };

    const getReceipt = (id: string, name: string) => {
        return db.getAttachment(id, name)
            .then((blob) => {
                    return URL.createObjectURL(blob);
                }
            );
    };


    return {saveReceiptString, saveReceiptBlob, getReceipt}
};

export default useReceipts;
