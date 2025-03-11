import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from './App';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { NotFound } from './pages/NotFound';
import { Access } from './pages/Access';
import LoadingOverlay from 'react-loading-overlay-ts';
import { useTranslation } from 'react-i18next';
import { Toast } from 'primereact/toast';
import store from './base/reduxstore';
import PrimeReact from 'primereact/api';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { DefaultColorSheme, DefaultLangu, DefaultMenuType, DefaultComponentThemeColor, DefaultRippleEffect } from './base/constant/themeConstant';

let responseIds: string[] = [];
const AppWrapper = (props: any) => {
    const { t } = useTranslation();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [colorScheme, setColorScheme] = useState(DefaultColorSheme);
    const [theme, setTheme] = useState(DefaultComponentThemeColor);
    const [componentTheme, setComponentTheme] = useState(DefaultComponentThemeColor);
    const [language, setLanguage] = useState(DefaultLangu);
    const [ripple, setRipple] = useState(DefaultRippleEffect);
    const [menuMode, setMenuMode] = useState(DefaultMenuType);
    const reCaptchaKey: any = process.env.REACT_APP_SITE_KEY;
    const [isLoadingPage, setLoadingPage] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('isLogin') === 'true') {
            setTheme(DefaultComponentThemeColor)
            onColorSchemeChange(DefaultColorSheme);
            onRippleChange(false);
            onLanguageChange(DefaultLangu);
            onMenuModeChange(DefaultMenuType);
            onComponentThemeChange(DefaultComponentThemeColor);
        }
    }, [colorScheme, componentTheme]);

    // useEffect(() => {

    //     const loadScriptByURL = (id: any, url: any, callback: any) => {
    //         const isScriptExist = document.getElementById(id);
    //         console.log('özge : ' + isScriptExist);
    //         if (!isScriptExist) {
    //             var script = document.createElement('script');
    //             script.type = 'text/javascript';
    //             script.src = url;
    //             script.id = id;
    //             script.onload = function () {
    //                 if (callback) callback();
    //             };
    //             document.body.appendChild(script);
    //         }

    //         if (isScriptExist && callback) callback();
    //     };

    //     loadScriptByURL('recaptcha-key', `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_SITE_KEY}`, function () {
    //         console.log('Script loaded!');
    //     });
    // }, []);
    // useEffect(() => {
    //     startConnection();
    // }, [])
    let location = useLocation();
    const toast = useRef<any>(null);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const { i18n } = useTranslation(['home', 'main']);
    const onMenuModeChange = (menuMode: any) => {
        setMenuMode(menuMode);
    };
    const onRippleChange = (e: boolean) => {
        PrimeReact.ripple = e;
        setRipple("false");
    };

    const onLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang); //change the language
        localStorage.setItem('langu', lang);
        setLanguage(lang);
    };

    const changeStyleSheetUrl = (id: any, value: any, from: any) => {
        const element = document.getElementById(id) as HTMLInputElement;
        const urlTokens = (element.getAttribute('href') as String).split('/');

        if (from === 1) {
            // which function invoked this function - change scheme
            urlTokens[urlTokens.length - 1] = value;
        } else if (from === 2) {
            // which function invoked this function - change color
            urlTokens[urlTokens.length - 2] = value;
        }

        const newURL = urlTokens.join('/');

        replaceLink(element, newURL);
    };
    const onColorSchemeChange = (scheme: string) => {
        changeStyleSheetUrl('layout-css', 'layout-' + scheme + '.css', 1);
        changeStyleSheetUrl('theme-css', 'theme-' + scheme + '.css', 1);
        setColorScheme(scheme);
    };

    const onMenuThemeChange = (theme: string) => {
        // console.log('onMenuThemeChange çalışıyor : ');
        // const layoutLink = document.getElementById('layout-css');
        // const href = 'assets/layout/css/' + theme + '/layout-' + colorScheme + '.css';
        // console.log('theme: ' + theme);
        // console.log('colorShemee: ' + colorScheme);
        // replaceLink(layoutLink, href);
        // setTheme(theme);
    };

    const onComponentThemeChange = (theme: string) => {
        const themeLink = document.getElementById('theme-css');
        let href = 'assets/theme/' + DefaultComponentThemeColor + '/theme-' + DefaultColorSheme + '.css';
        replaceLink(themeLink, href);
        // changeStyleSheetUrl('theme-css',theme, 2);
        setComponentTheme(theme);
    };

    const replaceLink = (linkElement: any, href: string, callback?: any) => {
        const id = linkElement.getAttribute('id');
        const cloneLinkElement = linkElement.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            const _linkElement = document.getElementById(id);
            _linkElement && _linkElement.remove();
            cloneLinkElement.setAttribute('id', id);

            if (callback) {
                callback();
            }
        });
    };

    const showToastMessage = (severity_value: any, summary_value: any, detail_value: any, life_value: any, position_value: any) => {
        toast.current.show({ severity: severity_value, summary: summary_value, detail: detail_value, life: life_value, position: position_value });
    };

    store.subscribe(() => {
        let toastItems = store.getState().showToast;
        if (!responseIds.some((item) => item === toastItems.id)) {
            responseIds.push(toastItems.id);
            if (toastItems.id != 0 && toastItems.message != undefined) {
                if (Object.prototype.toString.call(toastItems.message) === '[object String]') {
                    let summary = toastItems.summary;
                    let message = toastItems.message;
                    if ('summary_raw' in toastItems && ![null, undefined, ''].includes(toastItems.summary_raw)) {
                        summary = t(toastItems.summary_raw);
                    }
                    if ('message_raw' in toastItems && ![null, undefined, ''].includes(toastItems.message_raw)) {
                        message = t(toastItems.message_raw);
                    }
                    showToastMessage(toastItems.severity, summary, message, toastItems.duration, toastItems.position);
                    //toast.current.show({ severity: toastItems.severity, summary: summary, detail: message, life: toastItems.duration, position: toastItems.position });
                } else {
                    for (let i = 0; i < toastItems.message.length; i++) {
                        //toast.current.show({ severity: toastItems.severity, summary: toastItems.summary, detail: toastItems.message[i], life: toastItems.duration, position: toastItems.position });
                        showToastMessage(toastItems.severity, toastItems.summary, toastItems.message[i], toastItems.duration, toastItems.position);
                    }
                }
            }
        }
    });

    useEffect(() => {
        window.addEventListener('storage', () => {
            if (window.localStorage.getItem('isLoading') === '0') {
                setLoadingPage(false);
            }
            if (window.localStorage.getItem('isLoading') === '1') {
                setLoadingPage(true);
            }

            if (window.localStorage.getItem('isUnAuthorizedEndpoint') == '1') {
                window.localStorage.setItem('isUnAuthorizedEndpoint', '');

                showToastMessage('warn', t('text.title.unauthorized'), t('error.unauthorized.exception'), 4500, 'bottom-right');
            }
        });
    }, []);

    useLayoutEffect(() => {
        setLoadingPage(false);
    }, [location]);

    return (
        //         <GoogleReCaptchaProvider
        //     reCaptchaKey={reCaptchaKey}
        //     scriptProps={{
        //     async: false, // optional, default to false,
        //     defer: false, // optional, default to false
        //     appendTo: 'head', // optional, default to "head", can be "head" or "body",
        //     nonce: undefined // optional, default undefined
        //     }}
        //     // container={{ // optional to render inside custom element
        //     // element: "[required_id_or_htmlelement]",
        //     // parameters: {
        //     //     badge: 'bottomright', // optional, default undefined
        //     //     theme: 'dark', // optional, default undefined
        //     // }
        //     // }}
        // >
        <React.Fragment>
            <LoadingOverlay
                active={isLoadingPage}
                spinner
                fadeSpeed={0}
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: 'rgba(0, 0, 0, 0.5)'
                    }),
                    wrapper: (base) => ({
                        ...base
                    })
                }}
                text={t('loading') + '...'}
            >
                <Toast ref={toast} />
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <Login
                                language={language}
                                onLanguageChange={onLanguageChange}
                                colorScheme={colorScheme}
                                onColorSchemeChange={onColorSchemeChange}
                                componentTheme={componentTheme}
                                onComponentThemeChange={onComponentThemeChange}
                                theme={theme}
                                onMenuThemeChange={onMenuThemeChange}
                                ripple={ripple}
                                onRippleChange={onRippleChange}
                                menuMode={menuMode}
                                onMenuModeChange={onMenuModeChange}
                            />
                        }
                    />
                    <Route path="/error" element={<Error colorScheme={colorScheme} />} />
                    <Route path="/notfound" element={<NotFound colorScheme={colorScheme} />} />
                    <Route path="/access" element={<Access colorScheme={colorScheme} />} />
                    {/* <Route path="*" element={<App language={language} onLanguageChange={onLanguageChange} colorScheme={colorScheme} onColorSchemeChange={onColorSchemeChange} componentTheme={componentTheme} onComponentThemeChange={onComponentThemeChange} theme={theme} onMenuThemeChange={onMenuThemeChange} />} /> */}

                    <Route
                        path="*"
                        element={
                            <App
                                menuMode={menuMode}
                                language={language}
                                onLanguageChange={onLanguageChange}
                                colorScheme={colorScheme}
                                onColorSchemeChange={onColorSchemeChange}
                                componentTheme={componentTheme}
                                onComponentThemeChange={onComponentThemeChange}
                                theme={theme}
                                onMenuThemeChange={onMenuThemeChange}
                                ripple={ripple}
                                onRippleChange={onRippleChange}
                            />
                        }
                    />
                </Routes>
            </LoadingOverlay>
        </React.Fragment>
        // </GoogleReCaptchaProvider>
    );
};

export default AppWrapper;
