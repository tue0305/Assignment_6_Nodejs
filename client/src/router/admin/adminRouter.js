import Login from "../../component/admin/login/login";
import DashboardAdmin from "../../component/admin/dasboard";

const adminRouter = [
    {
        path: "/admin/home",
        exact: true,
        component: DashboardAdmin,
    },
];

export { adminRouter };
