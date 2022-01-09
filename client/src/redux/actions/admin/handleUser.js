import * as actType from "../../constants/constans";
import axios from "axios";

/*-----*/
const getUsers = (users) => ({
    type: actType.GET_ALL_USER,
    payload: users,
});

const userDeleted = () => ({
    type: actType.DELETE_USER,
});

const userAdd = () => ({
    type: actType.ADD_USER,
});

const detailUser = (user) => ({
    type: actType.GET_DETAIL_USER,
    payload: user,
});

const updateUser = (user) => ({
    type: actType.UPDATE_USER,
    // payload: user
});

export const loadUsers = () => {
    return function (dispatch) {
        axios
            .get("http://localhost:8001/get-all-users")
            .then((res) => {
                dispatch(getUsers(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const deleteUsers = (userId) => {
    return function (dispatch) {
        axios
            .delete(`http://localhost:8001/delete-user/${userId}`)
            .then((res) => {
                dispatch(userDeleted());
                dispatch(loadUsers());
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const addUsers = (user) => {
    return function (dispatch) {
        // axios
        //     .post(`http://localhost:8001/signup`, user)
        //     .then((res) => {
        //         //console.log(user);
        //         dispatch(userAdd());
        //         //dispatch(loadUsers());
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        axios({
            method: "post",
            url: "http://localhost:8001/signup",
            data: {
                email: user.email,
                password: user.password,
            },
        })
            .then((res) => {
                if (res.data.success === true) {
                    dispatch(userAdd());
                } else {
                    alert("sai");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const getDetailUsers = (userId) => {
    return function (dispatch) {
        axios
            .get(`http://localhost:8001/detail-user/${userId}`)
            .then((res) => {
                console.log(res);
                dispatch(detailUser(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const updateUsers = (user, userId) => {
    return function (dispatch) {
        axios
            .put(`http://localhost:8001/api/user/update-user/${userId}`, user)
            .then((res) => {
                console.log(res);
                dispatch(updateUser());
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
