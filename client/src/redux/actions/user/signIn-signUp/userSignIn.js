import * as ActionType from '../../../constants/constans';
import axios from 'axios';
import Swal from "sweetalert2";
// import CircularJSON from 'circular-json';
  
// export const actSignIn =  (dataSignIn) => {
//     return dispatch =>{
//         Axios({
//             method: 'POST',
//             url: 'http://localhost:8001/api/user/signin',
//             data:  CircularJSON.stringify(dataSignIn.user)
//         })
//         .then((result) =>{
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Đăng nhập thành công!',
//                 width: '400px',
//                 padding: '0 0 20px 0'
//             }).then(() =>{
//                 const data = result.data ;
//                 if (data) {
//                     console.log(data,'data');
//                     localStorage.setItem('accessToken', data.accessToken);
//                     const path = localStorage.getItem("prevLocation");
//                     window.location.href = path || "/";
//                     dispatch({
//                         type: ActionType.SIGN_IN_USER
//                     })
//                     console.log('se');
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



const forgotPassword = (users) => ({
    type: ActionType.SIGN_IN_USER,
    payload: users
});


const signIn = (users) => ({
    type: ActionType.SIGN_IN_USER,
    payload: users
});
export const signInAPI = (data) =>{
    axios({
        method: 'POST',
        url:'http://localhost:8001/api/user/signin',
        data: data
    })
    .then((res) =>{
        if(res.data.success == true){
        Swal.fire({
            icon: 'success',
            title: 'Đăng nhập thành công!',
            width: '400px',
            padding: '0 0 20px 0'
        }).then(() =>{
            localStorage.setItem('accessToken', res.data.accessToken);
            const path = localStorage.getItem("prevLocation");
            window.location.href = path || "/";
            return signIn;
        })}
        else{
            Swal.fire({
                icon: 'error',
                title: 'Somethings wrong, please sign in again!',
                width: '400px',
                padding: '0 0 20px 0'
            });
        }
    })
    .catch((err) =>{
        console.log(err);
    })
    // return {
    //     ok:"ok"
    // }
};

export const forgotPasswordAPI = () =>{
    return function (dispatch) {
        axios.post('http://localhost:8001/api/user/forgot-password')
        .then((res) =>{
            console.log('success');
            Swal.fire({
                icon: 'success',
                title: 'Please,check your email!',
                width: '400px',
                padding: '0 0 20px 0'
            }).then(() =>{
                dispatch(forgotPassword());
            })
        })
        .catch((err) =>{
            console.log(err);
        })
    }
};