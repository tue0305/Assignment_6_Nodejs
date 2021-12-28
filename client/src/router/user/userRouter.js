import Index from '../../component/screen/index';
import SignIn from '../../component/user/sign-in/signIn';
import SignUp from '../../component/user/sign-up/signUp';
import DetailRecipe from '../../component/user/detail/detailRecipe';
import ForgotPassword from '../../component/user/forgotPassword/forgotPassword';
import ResetPassword from '../../component/user/reset-password/resetPassword';
import ProfileUser from '../../component/user/profile/profileUser';
const userRouter = [
    {
        path: '/',
        exact: true,
        component: Index
    },
    {
        path: '/sign-in',
        exact: true,
        component: SignIn
    },
    {
        path: '/sign-up',
        exact: true,
        component: SignUp
    },
    {
        path: '/detail-recipe',
        exact: true,
        component: DetailRecipe
    },
    {
        path: `/forgot-password`,
        exact: true,
        component: ForgotPassword
    },
    {
        path: `/reset-password/:userId/:token`,
        exact: true,
        component: ResetPassword
    },
    {
        path: '/profile-user',
        exact: true,
        component: ProfileUser
    },
];

export {userRouter}