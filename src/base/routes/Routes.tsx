
import { MenuItem } from 'primereact/menuitem';
import Home from '../../pages/Home';

// import Profile from '../../pages/Profile'

interface routetype {
    path: string;
    component?: React.ReactNode | null;
    isPrivate: boolean;
}

const path = '';

const MainRouteValues: routetype[] = [
    {
        path: `${path}/home`,
        component: <Home />,
        isPrivate: false
    },
];

const MainMenuValues = [
    {
        keyword: 'Organization',
        label: 'Organization',
        icon: 'pi pi-sitemap',
        items: [
        ]
    }
];

const BreadcrumbRoutes = [
      { parent: 'module.name.dispatch', url: 'dispatch-list', label: 'screen.name.dispatch.list' }
];

const HomeRoute: MenuItem = { icon: 'pi pi-home', url: `${path}/#/home` };

export { MainRouteValues, MainMenuValues, BreadcrumbRoutes, HomeRoute };
