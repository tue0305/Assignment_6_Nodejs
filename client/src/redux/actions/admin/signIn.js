import axios from "axios";
import Swal from "sweetalert2";
import * as actionType from "../../constants/constans";

export const signinAdminAPI = (data, history) => {
    return function (dispatch) {
        axios({
            method: "POST",
            url: "http://localhost:8001/signin-admin",
            data: data,
        })
            .then((res) => {
                console.log(res.data.success === true, "daa");
                if (res.data.success === true) {
                    Swal.fire({
                        icon: "success",
                        title: "Đăng nhập thành công!",
                        width: "400px",
                        padding: "0 0 20px 0",
                    }).then(() => {
                        localStorage.setItem(
                            "accessToken",
                            res.data.accessToken
                        );
                        window.location.href = "/admin/Home";
                        return dispatch({
                            type: actionType.SIGN_IN_ADMIN,
                        });
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Somethings wrong, please sign in again!",
                        width: "400px",
                        padding: "0 0 20px 0",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
