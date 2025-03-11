import React from 'react';
import { useNavigate } from 'react-router-dom';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../base/translation/i18n';

export default function BackToHomeBtn() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <div>
            <I18nextProvider i18n={i18n}>
                <div className="back-to-home-btn-box">
                    <button className="button-demo-back" onClick={() => navigate('/home')}>
                        <i className="pi pi-chevron-left"></i>
                        <span>{t('home.back')}</span>
                    </button>
                </div>
            </I18nextProvider>
        </div>
    );
}
