import axios from 'axios';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { exact } from 'prop-types';

import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const BarcodeQrScanner = (props: any) => {
    const isDesktop = () => {
        return window.innerWidth > 1023;
    };
    const isVerticalScreen = () => {
        return window.innerWidth < 991;
    };
    const [cameraDirection, setCameraDirection] = useState<any>(window.innerWidth < 1200 ? { exact: 'environment' } : 'user');
    const [data, setData] = useState<any>();
    const handleCameraDirection = () => {
        if (cameraDirection == 'user') {
            setCameraDirection({ exact: 'environment' });
        } else {
            setCameraDirection('user');
        }
    };

    useEffect(() => {
        if (data) {
            props.setQrCode(data);
            props.hideDialog();
        }
    }, [data]);
    return (
        <Dialog visible={props.visibleModal} style={{ width: '320px' }} modal className="p-fluid" onHide={props.hideDialog} headerStyle={{ borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
            <span>{data}</span>
            <BarcodeScannerComponent
                width={'100%'}
                facingMode={cameraDirection}
                onUpdate={(err, result: any) => {
                    if (result) {
                        setData(result.text);
                    }
                }}
            />
            <Button onClick={handleCameraDirection} style={{ position: 'absolute', top: '50%', right: '45px', height: '30px', width: '30px', opacity: 0.3 }} icon="pi pi-sync"></Button>
        </Dialog>
    );
};

export default BarcodeQrScanner;
