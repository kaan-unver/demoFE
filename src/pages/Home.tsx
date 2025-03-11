import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../base/translation/i18n';
import LoadingOverlayWrapper from 'react-loading-overlay-ts';
import { CenterManager, StoreManager, Tadmin } from '../base/constant/constants';
export default function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isVisibleDispatchAddModal, setIsVisibleDispatchAddModal] = useState<boolean>(false);
    const [isVisibleBarcodeDispatchAddModal, setIsVisibleBarcodeDispatchAddModal] = useState<boolean>(false);

    const [statsTrigger, setStatsTrigger] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const hideAddDialog = () => handleAddModalVisibility(false);
    const handleAddModalVisibility = (modalIsVisible: boolean) => setIsVisibleDispatchAddModal(modalIsVisible);
    const newDispatch = () => {
        handleAddModalVisibility(true);
    };

    const hideAddBarcodeDialog = () => handlebarcodeAddModalVisibility(false);
    const handlebarcodeAddModalVisibility = (modalIsVisible: boolean) => setIsVisibleBarcodeDispatchAddModal(modalIsVisible);
    const newBarcodeDispatch = () => {
        handlebarcodeAddModalVisibility(true);
    };
    const handleSave = () => {
        setStatsTrigger((prev) => prev + 1);
    };
    const buttons = [
        { route: '/customer-list', icon: 'pi pi-user-plus', label: t('customer') },
        { route: '/order-list', icon: 'pi pi-plus', label: t('order') },
        { route: '/repair-list', icon: 'pi pi-wrench', label: t('repair') },
        { route: '/report', icon: 'pi pi-list', label: t('screen.name.report') },
        { route: '/tracking', icon: 'pi pi-truck', label: t('track.dispatch') }
    ];
    let roles = JSON.parse(localStorage.getItem('roles') || '[]');
    const isCenterManagerOrTadmin = roles.includes(CenterManager) || roles.includes(StoreManager);

    return (
        <I18nextProvider i18n={i18n}>
            <div>
                <div>
                    <div className="home-title-box">
                        <h1>{t('home.message')}</h1>
                    </div>
                    <div className="home-btn-box">
                        <button onClick={() => newDispatch()}>
                            <i className="pi pi-box"></i>
                            <span>{t('dispatch.op')}</span>
                        </button>
                        {isCenterManagerOrTadmin && (
                            <button onClick={() => newBarcodeDispatch()}>
                                <i className="pi pi-qrcode"></i>
                                <span>{t('barcode.dispatch')}</span>
                            </button>
                        )}
                        {isCenterManagerOrTadmin && (
                            <button onClick={() => navigate('/barcode-tracking')}>
                                <i className="pi pi-truck"></i>
                                <span>{t('barcode.tracking')}</span>
                            </button>
                        )}
                    </div>
                </div>
                <div>
                    <LoadingOverlayWrapper active={isLoading}>
                        <div>
                            {/* <HomeStats trigger={statsTrigger} onSave={handleSave} setIsLoading={setIsLoading}></HomeStats> */}
                        </div>
                    </LoadingOverlayWrapper>
                </div>
            </div>
        </I18nextProvider>
    );
}
