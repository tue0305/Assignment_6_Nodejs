import Axios from "axios";
import Swal from 'sweetalert2';
import * as actionType from '../../constants/constans';

export const signInAdminAPI = (data,history) =>{
    return function (dispatch) {
    Axios({
         method: 'POST',
         url:'http://localhost:8001/api/user/signin',
         data: data
     })
     .then((res) =>{
         if(res.data.role === 'ADMIN'){
         Swal.fire({
             icon: 'success',
             title: 'Đăng nhập thành công!',
             width: '400px',
             padding: '0 0 20px 0'
         }).then(() =>{
             localStorage.setItem('accessToken', res.data.accessToken);
            history.push("/admin/Home");
             return dispatch({
                 type: actionType.SIGN_IN_ADMIN
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