import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppMenu from './AppMenu';
import { classNames } from 'primereact/utils';
import { ScrollPanel } from 'primereact/scrollpanel';
import { useTranslation } from 'react-i18next';

const AppTopbar = (props: any) => {
    const { t } = useTranslation();

    const onTopbarSubItemClick = (event: any) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const navigateProfile = () => {
        navigate('/profile');
    };

    return (
        <>
            <div className="layout-topbar scroll-custom">
                <div className="layout-topbar-left">
                    <button className="topbar-menu-button p-link" onClick={props.onMenuButtonClick}>
                        <i className="pi pi-bars"></i>
                    </button>

                    <button className="logo p-link" onClick={() => navigate('/')}>
                        <img src={`assets/layout/images/logo-${props.colorScheme === 'light' ? 'dark' : 'light'}.png`} alt="logo" />
                    </button>

                    {/* <button className="p-link" onClick={() => navigate('/')}>
                        <img src={`assets/layout/images/appname-${props.colorScheme === 'light' ? 'dark' : 'light'}.png`} className="app-name" alt="app-name" />
                    </button> */}
                </div>
                <ScrollPanel className="scroll-custom">
                    <AppMenu
                        model={props.items}
                        menuMode={props.menuMode}
                        colorScheme={props.colorScheme}
                        menuActive={props.menuActive}
                        activeInlineProfile={props.activeInlineProfile}
                        onSidebarMouseOver={props.onSidebarMouseOver}
                        onSidebarMouseLeave={props.onSidebarMouseLeave}
                        toggleMenu={props.onToggleMenu}
                        onChangeActiveInlineMenu={props.onChangeActiveInlineMenu}
                        onMenuClick={props.onMenuClick}
                        onRootMenuItemClick={props.onRootMenuItemClick}
                        onMenuItemClick={props.onMenuItemClick}
                    />
                </ScrollPanel>
                <div className="layout-topbar-right">
                    <ul className="layout-topbar-right-items">
                        <li id="profile" className={classNames('profile-item', { 'active-topmenuitem': props.topbarMenuActive })}>
                            <button className="p-link pp-profile-btn" onClick={props.onTopbarItemClick}>
                                <i className="pi pi-fw pi-user"></i>
                            </button>

                                <li role="menuitem" onClick={() => navigate('/login')}>
                                    <button className="p-link all-btn" onClick={onTopbarSubItemClick}>
                                        <i className="pi pi-fw pi-sign-out"></i>
                                        <span>{t('menu.logout')}</span>
                                    </button>
                                </li>
                        </li>
                        {/* <li>
                            <button className="p-link">
                                <i className="topbar-icon pi pi-fw pi-bell"></i>
                                <span className="topbar-badge">2</span>
                                <span className="topbar-item-name">Notifications</span>
                            </button>
                        </li>
                        <li>
                            <button className="p-link">
                                <i className="topbar-icon pi pi-fw pi-comment"></i>
                                <span className="topbar-badge">5</span>
                                <span className="topbar-item-name">Messages</span>
                            </button>
                        </li> */}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default AppTopbar;
