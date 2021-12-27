import * as ActionType from '../../../constants/constans';
import axios from 'axios';
import Swal from "sweetalert2";

export const signInAPI = (data) =>{
   return function (dispatch) {
    axios({
        method: 'POST',
        url:'http://localhost:8001/api/user/signin',
        data: data
    })
    .then((res) =>{
        if(res.data.success === true){
        Swal.fire({
            icon: 'success',
            title: 'Đăng nhập thành công!',
            width: '400px',
            padding: '0 0 20px 0'
        }).then(() =>{
            localStorage.setItem('accessToken', res.data.accessToken);
            const path = localStorage.getItem("prevLocation");
            window.location.href = path || "/";
            return dispatch({
                type: ActionType.SIGN_IN_USER
            });
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
   }
};

export const signUpAPI = (data) =>{
    return function (dispatch){
        axios({
            method: 'POST',
            url:'http://localhost:8001/api/user/signup',
            data: data
        })
        .then((res) =>{
            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công!',
                width: '400px',
                padding: '0 0 20px 0'
            })
            return dispatch({
                type: ActionType.SIGN_UP_USER
            });
        })
        .catch((err) =>{
            console.log(err);
        })
    }
};

export const forgotAPI = (data) =>{
    return function (dispatch) {
     axios({
         method: 'POST',
         url:'http://localhost:8001/api/user/forgot-password',
         data: data
     })
     .then((res) =>{
         if(res.data.success === true){
         Swal.fire({
             icon: 'success',
             title: 'Hãy kiểm tra email của bạn!',
             width: '400px',
             padding: '0 0 20px 0'
         }).then(() =>{
            return dispatch({
                type: ActionType.FORGOT_PASSWORD_USER
            });
         })}
         else{
             Swal.fire({
                 icon: 'error',
                 title: 'Email không tồn tại, hãy thử lại!',
                 width: '400px',
                 padding: '0 0 20px 0'
             });
         }
     })
     .catch((err) =>{
         console.log(err);
     })
    }
};

export const resetAPI = (data, userId, token) =>{
    return function (dispatch) {
     axios({
         method: 'POST',
         url:`http://localhost:8001/api/user/reset-password/${userId}/${token}`,
         data: data
     })
     .then((res) =>{
         if(res.data.success === true){
         Swal.fire({
             icon: 'success',
             title: 'Đổi mật khẩu thành công!',
             width: '400px',
             padding: '0 0 20px 0'
         }).then(() =>{
            return dispatch({
                type: ActionType.RESET_PASSWORD_USER
            });
         })}
         else{
             Swal.fire({
                 icon: 'error',
                 title: 'Hãy thử lại!',
                 width: '400px',
                 padding: '0 0 20px 0'
             });
         }
     })
     .catch((err) =>{
         console.log(err);
     })
    }
};
 
