import { useState } from 'react';
import uuid from 'uuid';
import useReceipts from '../../hocs/useReceipts';
import Camera from '../common/media/Camera';

import styles from './styles/scanReceipts.module.scss';
import workspaceStyles from '../layout/styles/workspace.module.scss';

const id = uuid();

const ScanReceipts = () => {
    const [image, setImage] = useState<string>(null);
    const [showCamera, setShowCamera] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const {saveReceiptString, getReceipt} = useReceipts();

    console.log('error', error);

    return error ? (
        <div className={workspaceStyles.error}>
            {JSON.stringify(error)}
        </div>
    ) : (
        <div className={styles.scanReceipts}>
            {showCamera &&
            <Camera
                onImageCapture={(image) => {
                    saveReceiptString(id, 'test', image)
                        .then(() => {
                            setShowCamera(false);
                        })
                        .catch(setError);
                }}
                onError={setError}
            />
            }
            {!showCamera && image &&
                <>
            <div className={styles.previews}>
                <img src={image} className={styles.preview}/>
            </div>
                    <button
                        className={`ssb-btn secondary-btn`}
                        onClick={() => { setImage(null); setShowCamera(true); }}
                    >
                        Clear
                    </button>
            </>
            }
            {!showCamera && !image &&
            <button
                className={`ssb-btn primary-btn`}
                onClick={() => {
                    getReceipt(id, 'test')
                        .then((img) => {
                            setImage(img);
                        })
                        .catch(setError)
                }}
            >
                Fetch
            </button>
            }
        </div>
    );
};

export default ScanReceipts;
