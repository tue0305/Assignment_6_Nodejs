import Login from '../../component/admin/login';
import DashboardAdmin from '../../component/admin/dasboard';
const adminRouter = [
    {
        path: '/admin/Home',
        exact: true,
        component: DashboardAdmin
    },
    {
        path: '/sign-in-admin',
        exact: true,
        component: Login
    },
];

export {adminRouter}
