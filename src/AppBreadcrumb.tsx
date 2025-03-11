// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { classNames } from 'primereact/utils';
// import { BreadCrumb } from 'primereact/breadcrumb';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import ActiveCompany from './components/company/ActiveCompany';
// import { useTranslation } from 'react-i18next';

// const AppBreadcrumb = (props: any) => {
//     const [search, setSearch] = useState('');
//     const { t } = useTranslation();
//     const location = useLocation();

//     const activeRoute = props.routes.filter((route: any) => {
//         return route.label.replace(/\s/g, '').toLowerCase() === location.pathname.toLowerCase().replace(/\s/g, '').slice(1);
//     });

//     let items;

//     if (location.pathname === '/') {
//         items = [{ label: t('sidebar.dashboard') }, { label: t('breadcrumbs.OLE') }];
//     }
//     else if (location.pathname === '/userInfo') {
//         items = [{ label: t('user') }, { label: t('label.settings') }];
//     }
//     else if (location.pathname === '/profile') {
//         items = [{ label: t('user') }, { label: t('menu.profile') }];
//     }else if (!activeRoute.length) {
//         items = [{ label: '' }, { label: '' }];
//     }

//     else {
//         items = [{ label: t(`breadcrumbs.${activeRoute[0].parent.toLowerCase()}`) }, { label: t(`breadcrumbs.${activeRoute[0].label.toLowerCase()}`) }];

//     }

//     const isStatic = () => {
//         return props.menuMode === 'static';
//     };

//     return (
//         <div className="layout-breadcrumb-container">
//             <div className="layout-breadcrumb-left-items">
//                 {isStatic() && (
//                     <button className="menu-button p-link" onClick={props.onMenuButtonClick}>
//                         <i className="pi pi-bars"></i>
//                     </button>
//                 )}
//                 <BreadCrumb home={props.home} model={items} className="layout-breadcrumb" />
//             </div>
//             {/* <div className="layout-breadcrumb-right-items">
//                 <ActiveCompany></ActiveCompany>
//             </div> */}

//             <div className="layout-breadcrumb-right-items">
//                 <button tabIndex={0} className="search-icon p-link" onClick={props.breadcrumbClick}>
//                     <i className="pi pi-search"></i>
//                 </button>

//                 <div className={classNames('search-wrapper', { 'active-search-wrapper': props.searchActive })}>
//                     <span className="p-input-icon-left">
//                         <i className="pi pi-search"></i>
//                         <InputText placeholder={t('search.placeholder')} value={search} onChange={(e) => setSearch(e.target.value)} onClick={props.onInputClick} />
//                     </span>
//                 </div>
//                 {/*
//                 <span   className="layout-rightmenu-button-desktop ">
//                     <Button hidden label="Today" icon="pi pi-bookmark" className="layout-rightmenu-button" onClick={props.onRightMenuButtonClick}></Button>
//                 </span> */}
//                 {/*
//                 <span className="layout-rightmenu-button-mobile">
//                     <Button icon="pi pi-bookmark" className="layout-rightmenu-button" onClick={props.onRightMenuButtonClick}></Button>
//                 </span> */}
//             </div>
//         </div>
//     );
// };

// export default AppBreadcrumb;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const AppBreadcrumb = (props: any) => {
    const [search, setSearch] = useState<any>([]);
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    useState(() => {
        let k = -1;
        let tmpSearchList = [];
        for (let i = 0; i < props.searchValues.length; i++) {
            for (let j = 0; j < props.searchValues[i].items.length; j++) {
                if (JSON.stringify(props.searchValues[i].items[j]).includes('items')) {
                    for (let h = 0; h < props.searchValues[i].items[j].items.length; h++) {
                        let arr = {
                            id: k + 1,
                            category: t(props.searchValues[i].label),
                            name: t(props.searchValues[i].items[j].items[h].label),
                            icon: props.searchValues[i].icon,
                            to: props.searchValues[i].items[j].items[h].to
                        };
                        k++;
                        tmpSearchList.push(arr);
                    }
                } else {
                    let arr = {
                        id: k + 1,
                        category: t(props.searchValues[i].label),
                        name: t(props.searchValues[i].items[j].label),
                        icon: props.searchValues[i].icon,
                        to: props.searchValues[i].items[j].to
                    };
                    k++;
                    tmpSearchList.push(arr);
                }
            }
        }

        setSearch(tmpSearchList);
    });

    const activeRoute = props.routes.filter((route: any) => {
        if ('url' in route === false) {
            return false;
        }
        return route.url.toLowerCase() === location.pathname.toLowerCase().replace(/\s/g, '').slice(1);
    });

    let items;

    if (location.pathname === '/') {
        items = [{ label: t('module.name.customer') }, { label: t('screen.name.customer.list') }];
        navigate('/home');
    } else if (location.pathname === '/userInfo') {
        items = [{ label: t('user') }, { label: t('label.settings') }];
    } else if (location.pathname === '/profile') {
        items = [{ label: t('user') }, { label: t('menu.profile') }];
    } else if (!activeRoute.length) {
        items = [{ label: '' }, { label: '' }];
    } else {
        items = [{ label: t(`${activeRoute[0].parent}`) }, { label: t(`${activeRoute[0].label}`), url: '/#/' + activeRoute[0].url }];
        //items = [{ label: t(`${activeRoute[0].parent}`)}, { label: t(`${activeRoute[0].label}`), url: '/#/' + activeRoute[0].parent.toLowerCase()  }];
    }

    const isStatic = () => {
        return props.menuMode === 'static';
    };
    const formatResult = (item: any) => {
        return (
            // <a href={'#'+item.to} style={{color:'inherit'}} className='menu-item'>
            <div className="menu-item">
                <span style={{ display: 'block', textAlign: 'left', color: '--text-color !important' }}>
                    <i className={classNames(`${item.icon}`)}></i> {item.category}
                    {'>'}
                    {item.name}
                </span>
            </div>
            // </a>
        );
    };
    const searchTheme: any = props.theme;

    const isDesktop = () => {
        return window.innerWidth > 991;
    };
    return (
        <div className="layout-breadcrumb-container hidden">
            <div className="layout-breadcrumb-left-items">
                {isStatic() && (
                    <button className="menu-button p-link" onClick={props.onMenuButtonClick}>
                        <i className="pi pi-bars"></i>
                    </button>
                )}
                <BreadCrumb home={props.home} model={items} className="layout-breadcrumb" />
            </div>
            {/* <div className="layout-breadcrumb-right-items">
                <ActiveCompany></ActiveCompany>
            </div> */}

            <div className="layout-breadcrumb-right-items">
                <div className={classNames('mr-2')}>
                    <span className="p-input-icon-left">
                        <div style={{ width: 250 }}>
                            <i className="pi pi-search" style={{ position: 'absolute', left: 10, top: 12 }}></i>
                            <Select
                                noOptionsMessage={({ inputValue }) => t('search.no.options.message')}
                                options={search}
                                getOptionValue={(option: any) => option.id}
                                getOptionLabel={(option: any) => option.category + option.name}
                                formatOptionLabel={formatResult}
                                onChange={(e: any) => {
                                    window.location.assign('#' + e.to);
                                }}
                                isSearchable={true}
                                placeholder={
                                    <>
                                        <span className="ml-4">{t('search.placeholder')}</span>
                                    </>
                                }
                                className={classNames('mr-4 react-select-container')}
                                classNamePrefix="react-select"
                                styles={{
                                    control: (base: any) => ({
                                        ...base,
                                        borderColor: 'rgba(0,0,0,0) !important',
                                        borderRadius: 10,
                                        position: 'relative',
                                        width: 'auto'
                                    }),
                                    dropdownIndicator: (base: any) => ({
                                        ...base,
                                        color: 'rgba(0,0,0,0) !important'
                                    }),
                                    input: (base: any) => ({
                                        ...base,
                                        color: '--text-color',
                                        marginLeft: 20
                                    }),
                                    indicatorSeparator: (base: any) => ({
                                        ...base,
                                        backgroundColor: 'rgba(0,0,0,0) !important'
                                    }),
                                    option: (base: any) => ({
                                        ...base,
                                        cursor: 'pointer'
                                    })
                                }}
                                value=""
                                openMenuOnClick={false}
                            />
                        </div>
                    </span>
                </div>
                {/* 
                <span   className="layout-rightmenu-button-desktop ">
                    <Button hidden label="Today" icon="pi pi-bookmark" className="layout-rightmenu-button" onClick={props.onRightMenuButtonClick}></Button>
                </span> */}
                {/* 
                <span className="layout-rightmenu-button-mobile">
                    <Button icon="pi pi-bookmark" className="layout-rightmenu-button" onClick={props.onRightMenuButtonClick}></Button>
                </span> */}
            </div>
        </div>
    );
};

export default AppBreadcrumb;
