// import * as ActionType from '../../../constants/constans';
import Axios from 'axios';
import Swal from "sweetalert2";

export const actSignIn = (datasigin,history) =>{
    return dispatch =>{
        Axios({
            method:"POST",
            url:"http://localhost:4000/api/user/sign-in",
            data:datasigin
        })
        .then((rs) => {
            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công!',
                width: '400px',
                padding: '0 0 20px 0'
            }).then(() => {
                const data = rs.data || null;
                if (data && data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.token);
                    const path = localStorage.getItem("prevLocation");
                    // const history = useHistory();

                    // history.push(path || '/');
                    window.location.href = path || "/";
                } else {
                    console.log('Xin đăng nhập lại');
                }
            });
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Sai tài khoản hoặc mật khẩu!',
                text: 'Hãy thử lại ngay',
                width: '400px',
                padding: '0 0 20px 0'
            });
            console.log(err);
        });
    }
};
// export const signIn =  (dataSignIn) => {
//     return dispatch =>{
//         Axios({
//             method: 'POST',
//             url: 'http://localhost:4000/api/user/sign-in',
//             data: dataSignIn.user
//         })
//         .then((result) =>{
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Đăng nhập thành công!',
//                 width: '400px',
//                 padding: '0 0 20px 0'
//             }).then(() =>{
//                 const data = result.data || null;
//                 if (data && data.user) {
//                     localStorage.setItem('user', JSON.stringify(data.user));
//                     localStorage.setItem('token', data.token);
//                     const path = localStorage.getItem("prevLocation");
//                     window.location.href = path || "/";
//                     dispatch({
//                         type: ActionType.SIGN_IN_USER
//                     });
//                 } 
//                 else{
//                     console.log('d');
//                 }
//             });
//         })
//         .catch((err) => {
//             console.log(err,'err');
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Somethings wrong, please sign in again!',
//                 width: '400px',
//                 padding: '0 0 20px 0'
//             });
//         });
//     }
// }