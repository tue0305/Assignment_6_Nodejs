import Axios from "axios";
import Swal from 'sweetalert2';
import CircularJSON from 'circular-json';

export const actSignInAdmin = (dataSignIn, history) => {
    return dispatch => {
        Axios({
            method: "POST",
            url: `http://localhost:8001/api/user/signin`,
            data:  CircularJSON.stringify(dataSignIn.user)
        })
            .then((rs) => {
                Swal.fire({
                    icon: 'success',
                    title: 'SIGN IN SUCCESS!',
                    width: '400px',
                    padding: '0 0 20px 0'
                }).then(() => {
                    const data = rs.data || null;
                    if (rs.data.dataSignIn.role === "ADMIN") {
                        localStorage.setItem('userAdmin', JSON.stringify(rs.data));
                        localStorage.setItem('accessToken', data.accessToken);
                        
                        history.push("/admin/dashboard");
                    } else {
                       console.log('Some things wrong!');
                    }
                })
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Somethings wrong!',
                    text: 'Try please again',
                    width: '400px',
                    padding: '0 0 20px 0'
                });
            });
    };
};