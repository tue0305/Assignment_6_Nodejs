// import Admin from '../../component/admin/index';
// import DashboardLayout from '../../component/admin/layouts/dashboard';

// const adminRouter = [
//     {
//         path: '/admin',
//         exact: true,
//         component: Admin
//     },
//     {
//         path: '/admin-dasboard',
//         exact: true,
//         component: DashboardLayout
//     },
// ];

// export {adminRouter}
import {Link} from 'react-router-dom';
// layouts
import DashboardLayout from '../../component/admin/layouts/dashboard';
import LogoOnlyLayout from '../../component/admin/layouts/LogoOnlyLayout';


import DashboardApp from '../../component/admin/pages/DashboardApp';
import Products from '../../component/admin/pages/Products';
// import Products from './pages/Products';
import Blog from '../../component/admin/pages/Blog';
import User from '../../component/admin/pages/User';
// import User from './pages/User';
// import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function AdminRouter() {
  return Link([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Link to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    { path: '*', element: <Link to="/404" replace /> }
  ]);
}
