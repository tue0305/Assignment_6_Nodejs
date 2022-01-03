import Index from '../../component/screen/index';
import SignIn from '../../component/user/sign-in/signIn';
import SignUp from '../../component/user/sign-up/signUp';
import DetailRecipe from '../../component/user/detail/detailRecipe';
import ForgotPassword from '../../component/user/forgotPassword/forgotPassword';
import ResetPassword from '../../component/user/reset-password/resetPassword';
import ProfileUser from '../../component/user/profile/profileUser';
import Detailcategory from '../../component/user/detail-category/detailCategory';
import ManagePost from '../../component/user/user-post/userPost';
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
        path: '/detail-recipe/:postId',
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
    {
        path: '/detail-category/:categoryId',
        exact: true,
        component: Detailcategory
    },
    {
        path: '/post-user/:userId',
        exact: true,
        component: ManagePost
    },
];

export {userRouter}