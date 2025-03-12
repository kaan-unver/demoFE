//@ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { MainMenuValues, MainRouteValues, BreadcrumbRoutes, HomeRoute } from './base/routes/Routes';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './base/translation/i18n';
import AuthFunc from './base/basefunctions/authfunc';
import { Navigate } from 'react-router-dom';
import { LoginLocation } from './base/constant/commonLocations';
import store from './base/reduxstore';

import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppRightMenu from './AppRightMenu';
import AppBreadcrumb from './AppBreadcrumb';
import AppMenu from './AppMenu';
import LoadingOverlay from 'react-loading-overlay-ts';

import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';
import { DefaultColorSheme, DefaultComponentThemeColor } from './base/constant/themeConstant';
import StoreFunc from './base/basefunctions/storefunc';
import UserTypes from './base/user/userTypes.json';
import BackToHomeBtn from './components/base/BackToHomeBtn';

const App = (props: any) => {
    const location = useLocation();
    const [rightMenuActive, setRightMenuActive] = useState(false);
    const [configActive, setConfigActive] = useState(false);
    const [menuMode, setMenuMode] = useState(props.menuMode);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    // const [ripple, setRipple] = useState(true);
    const [sidebarStatic, setSidebarStatic] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [topbarMenuActive, setTopbarMenuActive] = useState(false);
    const [sidebarActive, setSidebarActive] = useState(false);
    const [pinActive, setPinActive] = useState(false);
    const [activeInlineProfile, setActiveInlineProfile] = useState(false);
    const [resetActiveIndex, setResetActiveIndex] = useState<boolean>(false);
    const [companies, setCompanies] = useState();
    const [selectedCompany, setSelectedCompany] = useState();
    const [connection, setConnection] = useState<'' | HubConnection>('');
    const copyTooltipRef = useRef<any>();
    const [dynamicMenuItems, setDynamicMenuItems] = useState([]);

    const { t } = useTranslation();
    const navigate = useNavigate();
    // PrimeReact.ripple = true;

    let rightMenuClick: any;
    let configClick: any;
    let menuClick: any;
    let searchClick: boolean = false;
    let topbarItemClick: any;
    // useEffect(()=>{
    //     if(sessionStorage.getItem('sessionStart')!='true')
    //         logout();

    // });
    // const startConnection = () => {
    //     if (window.location.hash !== "#/login") {
    //         //console.log(localStorage.getItem("socketUrl"));
    //         const connect = new signalR.HubConnectionBuilder()
    //             .withUrl(localStorage.getItem("socketUrl") + "?X-SocketToken=" + localStorage.getItem('socketToken'), {
    //                 skipNegotiation: false,
    //                 withCredentials: false,
    //                 transport: signalR.HttpTransportType.WebSockets
    //             })
    //             .withAutomaticReconnect()
    //             .build();
    //         setConnection(connect);
    //     }
    // }
    const moduleCheck = (moduleList: {}, keyword: any) => {
        let response = null;
        //@ts-ignore
        moduleList.forEach(function (moduleItem: any, index: any) {
            if (moduleItem.keyword == keyword) {
                response = moduleItem;
                return false;
            }
        });

        return response;
    };

    const onMainMenuChange = () => {
        var authorizedModules = localStorage.getItem('authorizedModules');
        if (authorizedModules != null && authorizedModules.length > 0) {
            let parsedData = JSON.parse(authorizedModules).result;

            let tmpMenuList = [];

            parsedData.forEach(function (moduleItem: any, index: any) {
                let tmpModule = moduleItem;
                tmpModule.label = moduleItem.name;
                delete tmpModule.name;
                delete tmpModule.id;
                delete tmpModule.mainModuleId;
                delete tmpModule.keyword;
                if ('subModuleWithScreens' in moduleItem && moduleItem.subModuleWithScreens != null) {
                    tmpModule.items = moduleItem.subModuleWithScreens;
                    delete tmpModule.subModuleWithScreens;
                    let tmpItemList = [];
                    tmpModule.items.forEach(function (subModule: any, index: any) {
                        let tmpSubModule = subModule;
                        tmpSubModule.label = subModule.name;
                        tmpSubModule.to = subModule.feRoute;
                        tmpSubModule.items = [];

                        tmpSubModule.screens.forEach(function (subItem: any, index: any) {
                            let tmpSubScreen = subItem;
                            tmpSubScreen.label = subItem.name;
                            tmpSubScreen.to = subItem.feRoute;

                            delete tmpSubScreen.name;
                            delete tmpSubScreen.feRoute;
                            delete tmpSubScreen.subModuleWithScreens;
                            delete tmpSubScreen.mainModuleId;
                            delete tmpSubScreen.moduleId;
                            delete tmpSubScreen.id;

                            tmpSubModule.items.push(tmpSubScreen);
                        });
                        delete tmpSubModule.screens;
                        delete tmpSubModule.subModuleWithScreens;
                        delete tmpSubModule.mainModuleId;
                        delete tmpSubModule.moduleId;
                        delete tmpSubModule.id;
                        delete tmpSubModule.to;

                        tmpItemList.push(tmpSubModule);
                    });
                    tmpModule.items = tmpItemList;
                } else {
                    tmpModule.items = moduleItem.screens;
                    let tmpItemList = [];
                    tmpModule.items.forEach(function (subItem: any, index: any) {
                        let tmpSubScreen = subItem;
                        tmpSubScreen.label = subItem.name;
                        tmpSubScreen.to = subItem.feRoute;

                        delete tmpSubScreen.name;
                        delete tmpSubScreen.moduleId;
                        delete tmpSubScreen.id;
                        delete tmpSubScreen.feRoute;

                        tmpItemList.push(tmpSubScreen);
                    });
                    tmpModule.items = tmpItemList;
                }
                delete tmpModule.screens;
                delete tmpModule.subModuleWithScreens;
                //console.log(moduleItem);

                tmpMenuList.push(tmpModule);
            });
            //console.log(tmpMenuList);
            setDynamicMenuItems(tmpMenuList);

            /*let FinalMainMenuValues = []

            MainMenuValues.forEach(function (mainMenuItem: any, index: any) {
                let checkResult = moduleCheck(parsedData, mainMenuItem.keyword);

                if (checkResult != null) {
                    let newItem = {}
                    newItem = mainMenuItem;
                    newItem.label = checkResult.name; //t(checkResult.name);
                    newItem.icon = checkResult.icon;

                    FinalMainMenuValues.push(newItem);
                }                
            });

            setDynamicMenuItems(FinalMainMenuValues);*/
        }
    };

    useEffect(() => {
        onMainMenuChange();
    }, []);
    // useEffect(() => {
    //     startConnection();
    // }, []);
    // useEffect(() => {
    //     if (connection) {
    //         connection
    //             .start()
    //             .then(() => {
    //                 connection.on('ReceiveMessage', (message) => {
    //                     // if (message.data.data.screenCode == localStorage.getItem("screenCode")) {
    //                     console.log(message);
    //                     StoreFunc.setSignalRItems(message.data.data);

    //                     // }
    //                 });
    //             })
    //             .catch((error) => );
    //     }
    // }, [connection]);
    const isShowCompanySelectionWindows = localStorage.getItem('userType') == UserTypes.tenantAdmin || localStorage.getItem('userType') == UserTypes.tenant || localStorage.getItem('userType') == UserTypes.company;

    // const logout = () => {
    //     // sessionStorage.removeItem('sessionStart')
    //     localStorage.clear();
    //     AuthFunc.logoutOnly();
    //     navigate(LoginLocation);
    //     props.onComponentThemeChange(DefaultComponentThemeColor)
    //     props.onColorSchemeChange(DefaultColorSheme)
    // }

    const errorMessageForGettingCompany = (error: any) => {
        let tmpMessage = t('error.getting.companies');
        let url = null;
        if (error != null && error.data != null && error.data.messages != null) {
            tmpMessage = error.data.messages;
            url = error.config.url;
        }
        const item = {
            summary: t('fail'),
            message: tmpMessage,
            severity: 'error',
            position: 'top',
            duration: 5000,
            type: url
        };
        return item;
    };

    useEffect(() => {
        if (isShowCompanySelectionWindows) {
            const companyService = new CompanyService();
            companyService
                .getCompaniesShortInfo()
                .then((response: any) => {
                    if (response == null || response.data == null || response.data.data == null) {
                        // let item = errorMessageForGettingCompany(null);
                        // StoreFunc.setStoreItems(item);
                        return;
                    }
                    var result = response.data.data;
                    setCompanies(result);
                    let companySelected = result.filter((item: any) => item.id === localStorage.getItem('companyId'))[0];
                    setSelectedCompany(companySelected);
                })
                .catch((error) => {
                    // let item = errorMessageForGettingCompany(error);
                    // StoreFunc.setStoreItems(item);
                });
        }
    }, []);
    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    useEffect(() => {
        setResetActiveIndex(true);
        setMenuActive(false);
    }, [menuMode]);

    const setCompany = (value: any) => {
        setSelectedCompany(value);
    };

    const onDocumentClick = () => {
        if (!searchClick && searchActive) {
            onSearchHide();
        }

        if (!topbarItemClick) {
            setTopbarMenuActive(false);
        }

        if (!menuClick) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false);
                setResetActiveIndex(true);
            }

            if (overlayMenuActive || staticMenuMobileActive) {
                setOverlayMenuActive(false);
                setStaticMenuMobileActive(false);
            }

            hideOverlayMenu();
            unblockBodyScroll();
        }

        if (!rightMenuClick) {
            setRightMenuActive(false);
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        topbarItemClick = false;
        menuClick = false;
        configClick = false;
        rightMenuClick = false;
        searchClick = false;
    };

    const onSearchHide = () => {
        setSearchActive(false);
        searchClick = false;
    };

    const onMenuModeChange = (menuMode: any) => {
        setMenuMode(menuMode);
        setOverlayMenuActive(false);
    };
    useEffect(() => {
        // setMenuMode(location.pathname == '/create' ? 'overlay' : props.menuMode);
        if (location.pathname == '/create') {
            if (isOverlay()) {
                setOverlayMenuActive((prevState) => (prevState ? !prevState : prevState));
            }

            if (isDesktop()) {
                setStaticMenuDesktopInactive((prevState) => (!prevState ? !prevState : prevState));
            } else {
                setStaticMenuMobileActive((prevState) => !prevState);
            }
        }
    }, [location]);
    const onRightMenuButtonClick = () => {
        rightMenuClick = true;
        setRightMenuActive(true);
    };

    const onRightMenuClick = () => {
        rightMenuClick = true;
    };

    const onRightMenuActiveChange = (active: any) => {
        setRightMenuActive(active);
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = (event: any) => {
        setConfigActive((prevState) => !prevState);
        configClick = true;
        event.preventDefault();
    };

    // const onRippleChange = (e: any) => {
    //     PrimeReact.ripple = e.value;
    //     setRipple(e.value);
    // };

    const onMenuButtonClick = (event: any) => {
        menuClick = true;

        if (isOverlay()) {
            setOverlayMenuActive((prevState) => !prevState);
        }

        if (isDesktop()) {
            setStaticMenuDesktopInactive((prevState) => !prevState);
        } else {
            setStaticMenuMobileActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
    };

    const onTopbarItemClick = (event: any) => {
        topbarItemClick = true;
        setTopbarMenuActive((prevState) => !prevState);
        hideOverlayMenu();
        event.preventDefault();
    };

    const onToggleMenu = (event: any) => {
        menuClick = true;

        if (overlayMenuActive) {
            setOverlayMenuActive(false);
        }

        if (sidebarActive) {
            setSidebarStatic((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarMouseOver = () => {
        if (menuMode === 'sidebar' && !sidebarStatic) {
            setSidebarActive(isDesktop());
            setTimeout(() => {
                setPinActive(isDesktop());
            }, 200);
        }
    };

    const onSidebarMouseLeave = () => {
        if (menuMode === 'sidebar' && !sidebarStatic) {
            setTimeout(() => {
                setSidebarActive(false);
                setPinActive(false);
            }, 250);
        }
    };

    const onMenuClick = () => {
        menuClick = true;
    };

    const onChangeActiveInlineMenu = (event: any) => {
        setActiveInlineProfile((prevState) => !prevState);
        event.preventDefault();
    };

    const onRootMenuItemClick = () => {
        setMenuActive((prevState) => !prevState);
    };

    const onMenuItemClick = (event: any) => {
        if (!event.item.items) {
            hideOverlayMenu();
            setResetActiveIndex(true);
        }

        if (!event.item.items && (isHorizontal() || isSlim())) {
            setMenuActive(false);
        }
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const isOverlay = () => {
        return menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const onInputClick = () => {
        searchClick = true;
    };

    const breadcrumbClick = () => {
        searchClick = true;
        setSearchActive(true);
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };
    const applyChanges = (menuVal: string, themeVal: string, langVal: string, layoutTheme: string, compTheme: string, ripple: boolean) => {
        props.onColorSchemeChange(themeVal);
        onMenuModeChange(menuVal);
        props.onRippleChange(ripple);
        props.onLanguageChange(langVal);
        props.onComponentThemeChange(compTheme);

        onMainMenuChange();
    };
    const layoutClassName = classNames('layout-wrapper', {
        'layout-static': menuMode === 'static',
        'layout-overlay': menuMode === 'overlay',
        'layout-overlay-active': overlayMenuActive,
        'layout-slim': menuMode === 'slim',
        'layout-horizontal': menuMode === 'horizontal',
        'layout-active': menuActive,
        'layout-mobile-active': staticMenuMobileActive,
        'layout-sidebar': menuMode === 'sidebar',
        'layout-sidebar-static': menuMode === 'sidebar' && sidebarStatic,
        'layout-static-inactive': staticMenuDesktopInactive && menuMode === 'static',
        'p-ripple-disabled': !props.ripple
    });

    const routeComponents = MainRouteValues.map(({ path, component, isPrivate }, key) => {
        return isPrivate ? null : <Route path={path} element={component} key={key} />;
    });

    const BYPASS_LOGIN = process.env.REACT_APP_BYPASS_LOGIN;
    if (BYPASS_LOGIN === '1' && !(localStorage.getItem('fromLogin') === '1')) {
        const token = process.env.REACT_APP_DUMMY_USER_Token as string;

        localStorage.clear();
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('user', process.env.REACT_APP_DUMMY_USER as string);
        localStorage.setItem('title', process.env.REACT_APP_DUMMY_USER_Title as string);
        localStorage.setItem('jwttoken', token);
        localStorage.setItem('isLoginCheck', 'true');
        const updatejwt = {
            type: 'Update_Loginjwt',
            payload: token
        };
        store.dispatch(updatejwt);
        AuthFunc.loginOnly();
    }
    const navigateToLogin = (prevPath:any) => {
        debugger
        navigate(LoginLocation)
        if(location.pathname != prevPath)
            window.location.reload()
    }
    console.log(AuthFunc.isAuthenticated())
    {AuthFunc.isAuthenticated() || BYPASS_LOGIN === '1' ? null : navigateToLogin(location.pathname)}
        return (
            <I18nextProvider i18n={i18n}>
                <div className={layoutClassName} onClick={onDocumentClick}>
                    <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
    
                    <div className="layout-main">
                        <AppTopbar
                            items={dynamicMenuItems}
                            menuMode={menuMode}
                            colorScheme={props.colorScheme}
                            menuActive={menuActive}
                            topbarMenuActive={topbarMenuActive}
                            activeInlineProfile={activeInlineProfile}
                            onTopbarItemClick={onTopbarItemClick}
                            onMenuButtonClick={onMenuButtonClick}
                            onSidebarMouseOver={onSidebarMouseOver}
                            onSidebarMouseLeave={onSidebarMouseLeave}
                            onToggleMenu={onToggleMenu}
                            onChangeActiveInlineMenu={onChangeActiveInlineMenu}
                            onMenuClick={onMenuClick}
                            onMenuItemClick={onMenuItemClick}
                            onRootMenuItemClick={onRootMenuItemClick}
                            resetActiveIndex={resetActiveIndex}
                        />
    
                        <AppMenu
                            model={dynamicMenuItems}
                            onRootMenuItemClick={onRootMenuItemClick}
                            onMenuItemClick={onMenuItemClick}
                            onToggleMenu={onToggleMenu}
                            onMenuClick={onMenuClick}
                            menuMode={menuMode}
                            colorScheme={props.colorScheme}
                            menuActive={menuActive}
                            sidebarActive={sidebarActive}
                            sidebarStatic={sidebarStatic}
                            pinActive={pinActive}
                            onSidebarMouseLeave={onSidebarMouseLeave}
                            onSidebarMouseOver={onSidebarMouseOver}
                            activeInlineProfile={activeInlineProfile}
                            onChangeActiveInlineMenu={onChangeActiveInlineMenu}
                            resetActiveIndex={resetActiveIndex}
                            onColorSchemeChange={props.onColorSchemeChange}
                            onComponentThemeChange={props.onComponentThemeChange}
                        />
    
                        <AppBreadcrumb
                            home={HomeRoute}
                            routes={BreadcrumbRoutes}
                            onMenuButtonClick={onMenuButtonClick}
                            searchValues={dynamicMenuItems}
                            menuMode={menuMode}
                            onRightMenuButtonClick={onRightMenuButtonClick}
                            onInputClick={onInputClick}
                            searchActive={searchActive}
                            breadcrumbClick={breadcrumbClick}
                            theme={props.theme}
                        />
                        <div className="layout-main-content">
                            <div className={window.location.hash.includes('home') ? 'hidden' : ''}>
                                <BackToHomeBtn />
                            </div>
                            <div>
                                <Routes>
                                    {routeComponents}
                                </Routes>
                            </div>
                        </div>
                        
                        <AppFooter colorScheme={props.colorScheme} />
                    </div>
    
                    {/* <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuClick={onRightMenuClick} onRightMenuActiveChange={onRightMenuActiveChange} /> */}
    
                    {/* <AppConfig 
                    configActive={configActive}
                    onConfigButtonClick={onConfigButtonClick}
                    onConfigClick={onConfigClick}
                    menuMode={menuMode}
                    changeMenuMode={onMenuModeChange}
                    colorScheme={props.colorScheme}
                    changeColorScheme={props.onColorSchemeChange}
                    theme={props.theme}
                    changeTheme={props.onMenuThemeChange}
                    componentTheme={props.componentTheme}
                    changeComponentTheme={props.onComponentThemeChange}
                    ripple={ripple}
                    onRippleChange={onRippleChange}
                    onLanguageChange={props.onLanguageChange}
                    language={props.language}
                /> */}
                </div>
            </I18nextProvider>
        );
    }

export default App;
