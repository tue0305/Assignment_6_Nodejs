import * as ActionType from '../../../constants/constans';
import Axios from 'axios';
import Swal from "sweetalert2";
import CircularJSON from 'circular-json';
  
export const actSignUp =  (dataSignUp) => {
    return dispatch =>{
        Axios({
            method: 'POST',
            url: 'http://localhost:8001/api/user/signup',
            data:  CircularJSON.stringify(dataSignUp.user)
        })
        .then((result) =>{
            Swal.fire({
                icon: 'success',
                title: 'Sign Up Success!',
                width: '400px',
                padding: '0 0 20px 0'
            }).then(() =>{
                const data = result.data || null;
                if (data && data.user) {
                    const path = localStorage.getItem("prevLocation");
                    window.location.href = path || "/";
                    dispatch({
                        type: ActionType.SIGN_UP_USER
                    });
                } 
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Somethings wrong, please sign up again!',
                        width: '400px',
                        padding: '0 0 20px 0'
                    });
                }
            });
        })
        .catch((err) => {
            console.log(err,'err');
        });
    }
}