import React, { useRef, useState, useEffect, useCallback } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import store from '../base/reduxstore';
import { useNavigate } from 'react-router-dom';
import LoginService from '../service/LoginService';
import { classNames } from 'primereact/utils';
import StoreFunc from '../base/basefunctions/storefunc';
import GeneralFunc from '../base/basefunctions/generalfunc';
import { useTranslation } from 'react-i18next';
import { LoginLocation } from '../base/constant/commonLocations';

export const ForgetPassword = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [jwttoken, setJwtToken] = useState('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loginFailedMessage, setLoginFailedMessage] = useState('');
    const [isEmailFormatWrong, setIsEmailFormatWrong] = useState<boolean>(false);
    const title = 'human';

    useEffect(() => {
        localStorage.clear();
    }, []);

    localStorage.setItem('isLoginCheck', 'false');

    const ShowErrorMessage = (errorMessage: any, errorType: any, onlyMessage: boolean = false) => {
        setLoginFailedMessage(errorMessage);
        setLoading(false);

        if (onlyMessage == false) {
            const item = {
                summary: t('fail'),
                message: errorMessage,
                severity: 'error',
                position: 'top',
                duration: 5000,
                type: errorType
            };
            StoreFunc.setStoreItems(item);
        }
    };

    const ShowSuccessMessage = () => {
        setLoading(false);
        const item = {
            summary: t('success'),
            message: [t('forgetPassword.success.reset.link.sent')],
            severity: 'success',
            position: 'top',
            duration: 5000
        };
        StoreFunc.setStoreItems(item);
    };

    const forgetPassword = () => {
        setIsEmailFormatWrong(false);
        setSubmitted(true);
        setLoginFailedMessage('');
        let emailValue = email.trim();
        let passwordValue = password.trim();
        if ([null, undefined, ''].includes(emailValue) && [null, undefined, ''].includes(passwordValue)) {
            return;
        }

        if (!GeneralFunc.validateEmail(emailValue)) {
            setIsEmailFormatWrong(true);
            return;
        }

        setLoading(true);
        localStorage.setItem('page', 'login');
        var errorMessage: any = t('error.reset.password');
        var errorType: any = null;
        const loginService = new LoginService();
        loginService
            .ForgetPassword(email)
            .then((response) => {
                localStorage.setItem('page', '');
                const data = response.data;
                const success = response.success;
                if (success == false) {
                    ShowErrorMessage(errorMessage, errorType, true);
                    return;
                }
                ShowSuccessMessage();
            })
            .catch((error: any) => {
                localStorage.setItem('page', '');
                if (error != null && error.data != null && error.data.messages != null) {
                    errorMessage = error.data.messages;
                    errorType = error.config.url;
                }
                ShowErrorMessage(errorMessage, errorType);
            });
    };

    return (
        <div className="login-body">
            <div className="login-image">
                <img src={`assets/layout/images/Demo-mobil.png`} alt="Demo" />
            </div>
            <div className="login-panel p-fluid">
                <div className="flex flex-column">
                    <div className="flex align-items-center mb-6 logo-container">
                        <img src={`assets/layout/images/logo-${props.colorScheme === 'light' ? 'dark' : 'light'}.png`} className="login-logo" alt="login-logo" />
                        <img src={`assets/layout/images/appname-${props.colorScheme === 'light' ? 'dark' : 'light'}.png`} className="login-appname" alt="login-appname" />
                    </div>
                    <form className="form-container" onSubmit={forgetPassword} noValidate>
                        <div className="field">
                            <span className="p-input-icon-left">
                                <i className="pi pi-envelope"></i>
                                <InputText id="email" placeholder={t('login.label.email')} required value={email} onChange={(e) => setEmail(e.target.value)} className={classNames({ 'p-invalid': submitted && !email })} />
                            </span>
                            {submitted && !email && (
                                <div>
                                    <small className="p-invalid" style={{ color: 'red' }}>
                                        {t('required.field')}
                                    </small>
                                </div>
                            )}
                            {submitted && email && isEmailFormatWrong && (
                                <div>
                                    <small className="p-invalid" style={{ color: 'red' }}>
                                        {t('login.error.email.format')}
                                    </small>
                                </div>
                            )}
                        </div>
                        <button onClick={() => navigate(LoginLocation)} className="flex font-medium p-link o-underline text-blue-500">
                            {t('forgetPassword.return.login')}
                        </button>
                    </form>
                    <div className="button-container">
                        <Button label={t('btn.forget.password')} icon="pi pi-check" loading={loading} onClick={forgetPassword} />
                        {submitted && loginFailedMessage != '' && (
                            <small className="p-invalid" style={{ color: 'red' }}>
                                {loginFailedMessage}
                            </small>
                        )}
                    </div>
                </div>
                <div className="login-footer flex align-items-center">
                    <div className="flex align-items-center login-footer-logo-container">
                        <img src={`assets/layout/images/logo-${props.colorScheme === 'light' ? 'dark' : 'light'}.png`} className="login-footer-logo" alt="login-footer-logo" />
                        <img src={`assets/layout/images/appname-${props.colorScheme === 'light' ? 'dark' : 'light'}.png`} className="login-footer-appname" alt="login-footer-appname" />
                    </div>
                    <span>Copyright 2024</span>
                </div>
            </div>
        </div>
    );
};
