// import {Link} from 'react-router-dom';
// // layouts
// // import DashboardLayout from './layouts/dashboard';
// import DashboardLayout from '../../component/admin/layouts/dashboard';
// import DashboardApp from '../../component/admin/pages/DashboardApp';
// //
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import DashboardApp from './pages/DashboardApp';
// // import Products from './pages/Products';
// // import Blog from './pages/Blog';
// // import User from './pages/User';
// // import NotFound from './pages/Page404';

// // ----------------------------------------------------------------------

// export default function Router() {
//   return Link([
//     {
//       path: '/dashboard',
//       element: <DashboardLayout />,
//       children: [
//         { element: <Link to="/dashboard/app" replace /> },
//         { path: 'app', element: <DashboardApp /> },
//         { path: 'user', element: <User /> },
//         { path: 'products', element: <Products /> },
//         { path: 'blog', element: <Blog /> }
//       ]
//     },
//     // {
//     //   path: '/',
//     //   element: <LogoOnlyLayout />,
//     //   children: [
//     //     { path: 'login', element: <Login /> },
//     //     { path: 'register', element: <Register /> },
//     //     { path: '404', element: <NotFound /> },
//     //     { path: '/', element: <Link to="/dashboard" /> },
//     //     { path: '*', element: <Link to="/404" /> }
//     //   ]
//     // },
//     { path: '*', element: <Link to="/404" replace /> }
//   ]);
// }
