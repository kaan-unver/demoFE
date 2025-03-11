import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { classNames } from 'primereact/utils';

import AuthFunc from './base/basefunctions/authfunc';
import { LoginLocation } from './base/constant/commonLocations';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DefaultColorSheme, DefaultComponentThemeColor } from './base/constant/themeConstant';

const AppInlineMenu = (props: any) => {
    const { t } = useTranslation();
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const isSlim = () => {
        return props.menuMode === 'slim';
    };

    const isStatic = () => {
        return props.menuMode === 'static';
    };

    const isSidebar = () => {
        return props.menuMode === 'sidebar';
    };

    const isMobile = () => {
        return window.innerWidth <= 991;
    };

    const logout = () => {
        localStorage.clear();
        props.onColorSchemeChange(DefaultColorSheme);
        props.onComponentThemeChange(DefaultComponentThemeColor);
        AuthFunc.logoutOnly();
        navigate(LoginLocation);
        window.location.reload();
    };
    const navigateUserInfo = () => {
        navigate('/userInfo');
    };
    const navigateKvkk = () => {
        navigate('/kvkk');
    };
    const navigateExpConsent = () => {
        navigate('/express-consent-list');
    };
    const navigateProfile = () => {
        navigate('/profile');
    };
    return (
        <>
            {!isMobile() && (isStatic() || isSlim() || isSidebar()) && (
                <div className={classNames('layout-inline-menu', { 'layout-inline-menu-active': props.activeInlineProfile })}>
                    <button className="layout-inline-menu-action p-link" onClick={props.onChangeActiveInlineMenu}>
                        <img src="assets/demo/images/avatar/unknown-profile.png" alt="avatar" style={{ width: '44px', height: '44px' }} />
                        <span className="layout-inline-menu-text">{localStorage.getItem('user')}</span>
                        {/* <i className="layout-inline-menu-icon pi pi-angle-down"></i> */}
                    </button>
                    <ul ref={menuRef} className="layout-inline-menu-action-panel">
                            <li className="layout-inline-menu-action-item">
                                <button className="p-link" onClick={logout}>
                                    <i className="pi pi-power-off pi-fw"></i>
                                    <span>{t('menu.logout')}</span>
                                </button>
                            </li>
                        </ul>
                    {/* <CSSTransition nodeRef={menuRef} classNames="p-toggleable-content" timeout={{ enter: 1000, exit: 450 }} in={props.activeInlineProfile} unmountOnExit>
                        
                    </CSSTransition> */}
                </div>
            )}
        </>
    );
};

export default AppInlineMenu;
