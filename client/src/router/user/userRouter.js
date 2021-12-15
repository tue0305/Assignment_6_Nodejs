import Index from '../../component/screen/index';
import SignIn from '../../component/user/sign-in/signIn';
import SignUp from '../../component/user/sign-up/signUp';

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
];

export {userRouter}