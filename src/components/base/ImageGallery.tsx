import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import React, { useState } from 'react';
// import CustomerService from '../../service/customer/CustomerService';
import { useTranslation } from 'react-i18next';

const ImagePreview = (props: any) => {
    const { t } = useTranslation();
    const files: any[] = props.files;
    const [index, setIndex] = useState<any>(props.index);

    const handleIndex = (inc: any) => {
        var newIndex: any = index + inc;
        if (newIndex < 0) {
            newIndex = files.length - 1;
        }
        if (newIndex >= files.length) {
            newIndex = 0;
        }
        setIndex(newIndex);
    };
    return (
        <Dialog visible={props.visibleModal} style={{ width: '900px', maxWidth: '95%' }} headerStyle={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }} header={t('image.preview')} modal className="p-fluid" onHide={props.hideDialog}>
            {
                <>
                    <img src={`${props.imagePath}${files[index].split('_Uploads\\')[1]}`} style={{ width: '100%', position: 'relative' }}></img>
                    <Button onClick={() => handleIndex(-1)} style={{ position: 'absolute', top: '50%', left: '45px', height: '30px', width: '30px', opacity: 0.3 }} icon="pi pi-chevron-left" className="p-button-rounded p-button-primary"></Button>
                    <Button onClick={() => handleIndex(1)} style={{ position: 'absolute', top: '50%', right: '45px', height: '30px', width: '30px', opacity: 0.3 }} icon="pi pi-chevron-right" className="p-button-rounded p-button-primary"></Button>
                </>
            }
        </Dialog>
    );
};

export default ImagePreview;
