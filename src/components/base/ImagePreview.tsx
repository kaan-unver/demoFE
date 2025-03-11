import { Dialog } from 'primereact/dialog';

import React from 'react';
// import CustomerService from '../../service/customer/CustomerService';
import { useTranslation } from 'react-i18next';

const ImagePreview = (props: any) => {
    const { t } = useTranslation();

    return (
        <Dialog visible={props.visibleModal} style={{ width: '900px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }} header={t('image.preview')} modal className="p-fluid" onHide={props.hideDialog}>
            <img src={props.src} style={{ width: '100%' }}></img>
        </Dialog>
    );
};

export default ImagePreview;
