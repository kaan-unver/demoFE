
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
    
];

const MainMenuValues = [
    {
        keyword: 'Organization',
        label: 'Organization',
        icon: 'pi pi-sitemap',
        items: [
            {
                label: 'Tenant',
                icon: 'pi pi-align-justify',
                items: [
                    { label: 'List', icon: 'pi pi-bars', to: '/tenant-list' },
                    { label: 'List Users', icon: 'pi pi-user', to: '/tenant-user-list' },
                    { label: "Manage User's Roles", icon: 'pi pi-user-edit', to: '/tenant-user-tenant-role' }
                ]
            },
            {
                label: 'Company',
                icon: 'pi pi-building',
                items: [
                    { label: 'List', icon: 'pi pi-bars', to: '/company-list' },
                    { label: 'List Users', icon: 'pi pi-user', to: '/company-user-list' },
                    { label: "Manage User's Company", icon: 'pi pi-key', to: '/company-registration' },
                    { label: "Manage User's Company Role", icon: 'pi pi-user-edit', to: '/company-user-company-role' },
                    { label: "Manage User's Tenant Role", icon: 'pi pi-user-edit', to: '/company-user-tenant-role' }
                ]
            },
            {
                label: 'Licence',
                icon: 'pi pi-credit-card',
                items: [
                    { label: 'List', icon: 'pi pi-bars', to: '/licence-list' },
                    { label: 'Licence Module', icon: 'pi pi-file', to: '/licence-module' },
                    { label: 'Licence Tenant', icon: 'pi pi-user', to: '/licence-tenant' }
                ]
            },
            {
                label: 'Role',
                icon: 'pi pi-id-card',
                items: [{ label: 'Manage Roles', icon: 'pi pi-id-card', to: '/role-list' }]
            }
        ]
    },
    {
        label: 'Customer',
        icon: 'pi pi-user',
        items: [{ label: 'List', icon: 'pi pi-user', to: '/customer-list' }]
    },
    {
        label: 'Product',
        icon: 'pi pi-box',
        items: [
            { label: 'Product List', icon: 'pi pi-list', to: '/product-list' },
            { label: 'Product Group List', icon: 'pi pi-list', to: '/product-group-list' },
            { label: 'Category', icon: 'pi pi-chart-pie', to: '/category-list' }
        ]
    },
    {
        label: 'Producer',
        icon: 'pi pi-building',
        items: [{ label: 'List', icon: 'pi pi-building', to: '/producer-list' }]
    },
    {
        label: 'Order',
        icon: 'pi pi-chart-pie',
        items: [{ label: 'List', icon: 'pi pi-chart-pie', to: '/order-list' }]
    },
    {
        label: 'Forwarding',
        icon: 'pi pi-chart-pie',
        items: [{ label: 'List', icon: 'pi pi-chart-pie', to: '/forwarding' }]
    }
];

const BreadcrumbRoutes = [
    //MainMenuValues içerisindeki değerlerin label değerlerini label'e verirsek yönledniğimiz sayfanın yolunu verir.
    { parent: 'screen.name.dashboard', url: 'dashboard-detail', label: 'screen.name.dashboard.detail' },
    { parent: 'screen.name.dashboard', url: 'dashboard-new', label: 'screen.name.dashboard.new' },
    { parent: 'screen.name.dashboard.new', url: 'dashboard-region-group-detail', label: 'screen.name.dashboard.region.group.detail' },
    { parent: 'screen.name.dashboard.region.group.detail', url: 'dashboard-region-detail', label: 'screen.name.dashboard.region.detail' },

    { parent: 'module.name.prepare', url: 'class-list', label: 'screen.name.class.list' },
    { parent: 'module.name.prepare', url: 'bounding-box', label: 'screen.name.bounding.box' },

    { parent: 'module.name.source', url: 'source-create', label: 'screen.name.source.create' },
    { parent: 'module.name.source', url: 'source-list', label: 'screen.name.source.list' },

    { parent: 'module.name.flow', url: 'flow-create', label: 'screen.name.flow.create' },
    { parent: 'module.name.flow', url: 'flow-list', label: 'screen.name.flow.list' },

    { parent: 'module.name.region', url: 'region-list', label: 'screen.name.region.list' },
    { parent: 'module.name.region', url: 'region-tag', label: 'screen.name.region.tag' },
    { parent: 'module.name.region', url: 'region-type', label: 'screen.name.region.type' },
    { parent: 'module.name.region', url: 'region-group', label: 'screen.name.region.group' },

    { parent: 'module.name.organization', label: 'screen.name.tenant' },
    { parent: 'module.name.organization', label: 'screen.name.company' },
    { parent: 'module.name.organization', label: 'screen.name.licence' },
    { parent: 'module.name.organization', label: 'screen.name.module' },
    { parent: 'module.name.organization', label: 'screen.name.screen' },
    { parent: 'module.name.organization', label: 'screen.name.role' },
    { parent: 'module.name.organization', label: 'screen.name.shift' },

    { parent: 'screen.name.tenant', url: 'tenant-list', label: 'screen.name.tenant.list' },
    { parent: 'screen.name.tenant', url: 'tenant-user-list', label: 'screen.name.tenant.user' },
    { parent: 'screen.name.tenant', url: 'tenant-user-tenant-role', label: 'screen.name.tenant.user.role' },

    { parent: 'screen.name.company', url: 'company-list', label: 'screen.name.company.list' },
    { parent: 'screen.name.company', url: 'company-user-list', label: 'screen.name.company.user' },
    { parent: 'screen.name.company', url: 'company-registration', label: 'screen.name.company.registration' },
    { parent: 'screen.name.company', url: 'company-user-company-role', label: 'screen.name.company.user.company.role' },

    { parent: 'screen.name.licence', url: 'licence-list', label: 'screen.name.licence.list' },
    { parent: 'screen.name.licence', url: 'licence-module', label: 'screen.name.licence.module' },
    { parent: 'screen.name.licence', url: 'licence-tenant', label: 'screen.name.licence.tenant' },

    { parent: 'screen.name.module', url: 'module-list', label: 'screen.name.module.list' },

    { parent: 'screen.name.screen', url: 'screen-list', label: 'screen.name.screen.list' },
    { parent: 'screen.name.screen', url: 'screen-endpoint', label: 'screen.name.screen.endpoint' },

    { parent: 'screen.name.role', url: 'role-list', label: 'screen.name.role.list' },

    { parent: 'screen.name.shift', url: 'shift-list', label: 'screen.name.shift.list' },
    { parent: 'screen.name.shift', url: 'employee-type', label: 'screen.name.employee.type' },
    { parent: 'screen.name.shift', url: 'employee-type-cost', label: 'screen.name.employee.type.cost' },
    { parent: 'screen.name.shift', url: 'shift-employee-type-cost', label: 'screen.name.shift.employee.type.cost' },
    { parent: 'screen.name.shift', url: 'shift-daily-employee', label: 'screen.name.shift.daily.employee' },

    { parent: 'module.name.customer', url: 'customer-list', label: 'screen.name.customer.list' },
    { parent: 'module.name.customer', url: '', label: 'screen.name.customer.list' },

    { parent: 'module.name.product', url: 'product-list', label: 'screen.name.product.list' },
    { parent: 'module.name.product', url: 'product-status-list', label: 'screen.name.product.status.list' },
    { parent: 'module.name.product', url: 'product-group-list', label: 'screen.name.product.group.list' },
    { parent: 'module.name.category', url: 'category-list', label: 'screen.name.category.list' },
    { parent: 'module.name.order', url: 'order-list', label: 'screen.name.order.list' },
    { parent: 'module.name.repair', url: 'repair-list', label: 'screen.name.repair.list' },
    { parent: 'module.name.producer', url: 'producer-list', label: 'screen.name.producer.list' },
    { parent: 'module.name.kvkk', url: 'kvkk', label: 'screen.name.kvkk.list' },
    { parent: 'module.name.dispatch', url: 'dispatch-list', label: 'screen.name.dispatch.list' }
];

const HomeRoute: MenuItem = { icon: 'pi pi-home', url: `${path}/#/home` };

export { MainRouteValues, MainMenuValues, BreadcrumbRoutes, HomeRoute };
