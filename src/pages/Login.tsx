import React, { useRef, useState, useEffect, useCallback } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import store from '../base/reduxstore';
import AuthFunc from '../base/basefunctions/authfunc';
import { useNavigate } from 'react-router-dom';
import { DashboardNewLocation, ForgetPasswordLocation } from '../base/constant/commonLocations';
import LoginService from '../service/LoginService';
import { classNames } from 'primereact/utils';
import StoreFunc from '../base/basefunctions/storefunc';
import GeneralFunc from '../base/basefunctions/generalfunc';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../base/translation/i18n';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Guid } from 'guid-typescript';
import SignUp from '../components/signUp/SignUp';

export const Login = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [jwttoken, setJwtToken] = useState('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loginFailedMessage, setLoginFailedMessage] = useState('');
    const [isEmailFormatWrong, setIsEmailFormatWrong] = useState<boolean>(false);
    const [signUpVisible,setSignUpVisible] = useState<boolean>(false);
    const title = 'user';

    const controller = new AbortController();
    useEffect(() => {
        setTimeout(() => {
            controller.abort();
        }, 3000);
    });

    useEffect(() => {
        localStorage.clear();
    }, []);

    localStorage.setItem('isLoginCheck', 'false');
    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' && !loading) {
            login();
        }
    };

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
    const login = () => {
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
        var errorMessage: any = t('error.login.failed');
        var errorType: any = null;
        const loginService = new LoginService();
        loginService
            .Login(email, password)
            .then((response) => {
                localStorage.setItem('page', '');
                const data = response.data;
                const success = response.success;
                if (success) {
                    const token = data.token;
                    setTimeout(() => {
                        setLoading(false);
                        setJwtToken(token);
                        localStorage.clear();
                        localStorage.setItem('isLogin', 'true');
                        localStorage.setItem('fromLogin', '1');
                        localStorage.setItem('user', data.middleName === null ? data.firstName + ' ' + data.isLoginCheck : data.firstName + ' ' + data.middleName + ' ' + data.lastName);

                        localStorage.setItem('jwttoken', token);
                        localStorage.setItem('isLoginCheck', 'true');
                        const updatejwt = {
                            type: 'Update_Loginjwt',
                            payload: jwttoken
                        };
                        store.dispatch(updatejwt);
                        AuthFunc.loginOnly();
                        navigate(DashboardNewLocation);
                    }, 2000);
                } else {
                    const item = {
                        summary: t('warning'),
                        message: response.messages,
                        severity: 'warn',
                        position: 'top',
                        duration: 5000,
                        type: errorType
                    };
                    store.dispatch({
                        type: 'Show_Toast',
                        payload: {
                            id: Guid.create(),
                            summary: item.summary,
                            message: item.message,
                            type: item.type,
                            severity: item.severity,
                            date: new Date(),
                            position: item.position,
                            duration: item.duration
                        }
                    });
                    setLoading(false);
                }
            })
            .catch((error: any) => {
                localStorage.setItem('page', '');
                if (error != null && error.data != null && error.data.messages != null) {
                    const item = {
                        summary: error.status == 404 ? t('warning') : t('fail'),
                        message: error.data.messages,
                        severity: error.status == 404 ? 'warn' : 'error',
                        position: 'top',
                        duration: 5000,
                        type: errorType
                    };
                    store.dispatch({
                        type: 'Show_Toast',
                        payload: {
                            id: Guid.create(),
                            summary: item.summary,
                            message: item.message,
                            type: item.type,
                            severity: item.severity,
                            date: new Date(),
                            position: item.position,
                            duration: item.duration
                        }
                    });
                    setLoading(false);
                }
                setLoading(false);
            });
    };

    return (
        <div>
            <I18nextProvider i18n={i18n}>
                <div className="relative login-demo-box" style={{ overflow: 'hidden' }}>
                    <div className="login-bg-top">
                        <img src={`assets/login/login-1.jpg`} alt="top" />
                    </div>
                    <div className="login-form-main-box">
                        <div className="login-box" style={{display: !signUpVisible ? '' : 'none'}}>
                            <img src={`assets/login/logo.png`} alt="logo" style={{ width: '400px', marginBottom: '40px' }} />
                            <form className="form-container" onSubmit={login} noValidate>
                                <div className="form-main-layout">
                                    <div>
                                        <span className="p-input-icon-left w-full">
                                            <i className="pi pi-envelope"></i>
                                            <InputText id="email" placeholder={t('login.email')} required value={email} onChange={(e) => setEmail(e.target.value)} className={classNames({ 'p-invalid': submitted && !email }, 'w-full')} />
                                        </span>
                                        {submitted && !email && (
                                            <div>
                                                {' '}
                                                <small className="p-invalid">Email alanı zorunludur.</small>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <span className="p-input-icon-left w-full">
                                            <i className="pi pi-key"></i>
                                            <InputText
                                                id="password"
                                                type="password"
                                                required
                                                placeholder={t('login.password')}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className={classNames({ 'p-invalid': submitted && !password }, 'w-full')}
                                                onKeyDown={handleKeyDown}
                                            />
                                        </span>
                                        {submitted && !password && <small className="p-invalid">Şifre alanı zorunludur.</small>}
                                    </div>
                                </div>
                                {/* <button className="flex p-link">Forgot your password?</button> */}
                            </form>
                            <div className="button-container">
                                <Button className="login-demo-btn" label={t('login.submit')} loading={loading} onClick={login} />
                            </div>
                            <div className="justify-content-center flex my-2">
                                <small>veya</small>
                            </div>
                            <div className="button-container">
                                <Button className="login-demo-btn" label={t('sign.up')} onClick={() => setSignUpVisible(true)}/>
                            </div>
                        </div>
                        <SignUp signUpVisible={signUpVisible} setSignUpVisible={setSignUpVisible}></SignUp>

                    </div>
                </div>
            </I18nextProvider>
        </div>
    );
};
