import * as ActionType from '../../../constants/constans';
import Axios from 'axios';
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export const signIn =  dataSignIn => {
    return dispatch =>{
        Axios({
            method: 'POST',
            url: '',
            data: dataSignInUser
        })
        .then((result) =>{
            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công!',
                width: '400px',
                padding: '0 0 20px 0'
            }).then(() =>{
                const data = rs.data || null;
                if (data && data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.token);
                } else {
                    console.log('Xin đăng nhập lại');
                }
            });
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Somethings wrong, please sign in again!',
                text: 'Hãy thử lại ngay',
                width: '400px',
                padding: '0 0 20px 0'
            });
            console.log(err);
        });
    }
}