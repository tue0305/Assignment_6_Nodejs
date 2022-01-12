import axios from "axios";
import * as actType from "../../../constants/constans";

const detailPost = (post) => ({
    type: actType.GET_DETAIL_POST,
    payload: post,
});
const postDeleted = () => ({
    type: actType.DELETE_POST,
});
const manageGetPost = (managePosts) => ({
    type: actType.MANAGE_GET_POST,
    payload: managePosts,
});

export const manageGetPostAPI = () => {
    return function (dispatch) {
        axios({
            method: "GET",
            url: "http://localhost:8002/post",
        })
            .then((res) => {
                dispatch(manageGetPost(res.data));
            })
            .catch((err) => {
                console.log(err, "err");
            });
    };
};
// export const manageGetPostDetail = (postId) => {
//     return function (dispatch) {
//         axios
//             .get(`http://localhost:8002/post/${postId}`)
//             .then((res) => {
//                 console.log(res.data, "d");
//                 dispatch(detailPost(res.data));
//             })

//             .catch((err) => {
//                 console.log(err);
//             });
//     };
// };

export const manageGetPostDetailAPI = (postId) => {
    return function (dispatch) {
        axios

            .get(`http://localhost:8002/post/${postId}`)

            .then((res) => {
                console.log(res.data, "d");
                dispatch({
                    type: actType.MANAGE_GET_DETAIL_POST,
                    payload: res.data,
                });
            })

            .catch((err) => {
                console.log(err);
            });
    };
};
export const manageDeletePost = (postId) => {
    return function (dispatch) {
        const token = localStorage.getItem("accessToken");

        axios({
            method: "delete",
            url: `http://localhost:8002/post/user/delete/${postId}`,
            headers: { Authorization: "Bearer " + token },
        })
            .then((res) => {
                dispatch(postDeleted());
                dispatch(manageGetPostAPI());
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
