import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../base/translation/i18n';
import LoadingOverlayWrapper from 'react-loading-overlay-ts';
import { CenterManager, StoreManager, Tadmin } from '../base/constant/constants';
import { Schedule } from './Schedule';
export default function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const buttons = [{ route: '/customer-list', icon: 'pi pi-user-plus', label: t('customer') }];

    return (
        <I18nextProvider i18n={i18n}>
            <div>
                <div>
                    <Schedule></Schedule>
                </div>
            </div>
        </I18nextProvider>
    );
}
