import React, { useState, useEffect } from 'react';
import { Camera, CameraOff, RefreshCw, Cpu, FileText, Trash2, X } from 'react-feather';
import { Title } from '@statisticsnorway/ssb-component-library';
import Items from '../components/Items';
import QrScanner from '../components/qr/QrScanner';
import Photo from '../components/camera/Photo';
import { Tesseract } from '../components/ocr/TesseractWrapper';

import mockItems from '../mock/items';
import './workspace.scss';

const Workspace = () => {
    const [enableQR, setEnableQR] = useState(false);
    const [qrOpen, setQrOpen] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [qrData, setQrData] = useState(null);
    const [items, setItems] = useState([]);
    const [image, setImage] = useState(null);
    const [showScan, setShowScan] = useState(false);
    const [ocrData, setOCRData] = useState(null);
    const [isFront, setIsFront] = useState(false);

    useEffect(() => {
        setItems(mockItems)
    }, []);

    const cameraOff = () => {
        if (qrOpen) {
            setQrOpen(false);
        }
        if (cameraOpen) {
            setCameraOpen(false);
        }
    };

    const toggleCameraMode = () => {
        setIsFront(! isFront);
    };

    const extractItems = (qrData) => {
        const itemRows = qrData.split('\n');
        setItems(itemRows.map(itemRow => {
            const [name, unitCost, quantity, totalCost] = itemRow.split(' ');
            return {
                name,
                category: '',
                unitCost,
                quantity,
                totalCost,
            };
        }))
    };

    const showReceipt = () => {
        console.log('display receipt');
    }

    const acceptQrData = (qrData, image) => {
        extractItems(qrData);
        setQrOpen(false);
        setImage(image);
    }

    const onImageCapture = (image) => {
        setCameraOpen(false);
        console.log('Image', image);
        setImage(image);

        const imageBase64 = `data:image/jpeg;base64.${image}`;

        setOCRData(<p>OCR pågår ... <img src="/spinner.gif" width={20} /></p>);
        Tesseract
            .recognize(imageBase64, 'eng')
            .then((result) => {
                console.log('Result', result);
                const lines = result.data.text.split('\\n');
                const rows = lines.map(line => <tr><td>{line}</td></tr>);
                setOCRData(<table>{rows}</table>);
            })
    }

    return (
        <div className="workspace">
            <p>
                <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>Camera</span> :
                {isFront ? ' Front (PC)' : ' Back (mobile)'}
            </p>
            <div className="workspace-panel item-form-panel">
                <div className="add-item-panel">
                    <Title size={3}>Legge til poster</Title>
                    <div className="actionIcons">
                        {!(qrOpen || cameraOpen) &&
                        <>
                            {enableQR &&
                            <a href="#" onClick={() => {
                                setQrOpen(true);
                            }} className="actionIcon">
                                <Cpu style={{marginTop: '-3px', marginLeft: '-1px'}}/>
                            </a>
                            }
                                <a href="#" onClick={() => {
                                setCameraOpen(true);
                            }} className="actionIcon">
                                <Camera style={{marginTop: '-4px', marginLeft: '-1px'}}/>
                            </a>
                            <a href="#" onClick={toggleCameraMode} className="actionIcon">
                                <RefreshCw style={{marginTop: '-4px', marginLeft: '-1px'}}/>
                            </a>
                        </>
                        }
                        {(qrOpen || cameraOpen) &&
                        <a href="#" onClick={() => {
                        }} className="actionIcon">
                            <CameraOff onClick={cameraOff} style={{marginTop: '-5px'}}/>
                        </a>
                        }
                    </div>
                </div>
                <div className="cameraPanel">
                    {qrOpen &&
                    <div className="qr-scan-panel">
                        <QrScanner onQrData={acceptQrData}/>
                    </div>
                    }
                    {cameraOpen &&
                    <div className="qr-scan-panel">
                        <Photo
                            onCapture={onImageCapture}
                            facingMode={isFront ? 'user' : { exact: 'environment' }}
                        />
                    </div>
                    }
                </div>
            </div>
            <div className="workspace-panel list-items-panel">
                {items && items.length > 0 &&
                <div className="item-headers-panel">
                    <Title size={3}>Vareposter</Title>
                    <div className='actionIcons'>
                        <a href='#' onClick={() => {
                            setShowScan(!showScan);
                        }} className="actionIcon">
                            {showScan ?
                                <X style={{marginTop: '-3px', marginLeft: '-1px'}}/> :
                                <FileText style={{marginTop: '-3px', marginLeft: '-1px'}}/>}
                        </a>
                        <a href="#" onClick={() => {
                            setItems([]);
                        }} className="actionIcon">
                            <Trash2 style={{marginTop: '-3px', marginLeft: '-1px'}}/>
                        </a>
                    </div>
                </div>
                }
                {showScan && image &&
                <img width="100%" src={`data:image/jpeg;base64.${image}`}/>
                }
                {ocrData &&
                <div style={{background: '#ECFEED', marginTop: '1rem', padding: '1rem'}}>
                    {ocrData}
                </div>
                }
                {!ocrData &&
                    <Items items={items} />
                }
            </div>
        </div>
    );
};

export default Workspace;
