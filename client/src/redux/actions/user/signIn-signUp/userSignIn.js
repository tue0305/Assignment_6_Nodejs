import * as ActionType from '../../../constants/constans';
import Axios from 'axios';
import Swal from "sweetalert2";
import CircularJSON from 'circular-json';
  
export const actSignIn =  (dataSignIn) => {
    return dispatch =>{
        Axios({
            method: 'POST',
            url: 'http://localhost:8001/api/user/signin',
            data:  CircularJSON.stringify(dataSignIn.user)
        })
        .then((result) =>{
            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công!',
                width: '400px',
                padding: '0 0 20px 0'
            }).then(() =>{
                const data = result.data || null;
                if (data ) {
                    localStorage.setItem('accessToken', data.accessToken);
                    const path = localStorage.getItem("prevLocation");
                    window.location.href = path || "/";
                    dispatch({
                        type: ActionType.SIGN_IN_USER
                    });
                } 
                else{
                    console.log('d');
                }
            });
        })
        .catch((err) => {
            console.log(err,'err');
            Swal.fire({
                icon: 'error',
                title: 'Somethings wrong, please sign in again!',
                width: '400px',
                padding: '0 0 20px 0'
            });
        });
    }
}