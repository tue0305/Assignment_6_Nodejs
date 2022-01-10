import axios from "axios";
import * as actType from "../../../constants/constans";

const detailPost = (post) => ({
    type: actType.GET_DETAIL_POST,
    payload: post,
});

export const manageGetPostAPI = () => {
    return function (dispatch) {
        axios({
            method: "GET",
            url: "http://localhost:8002/post",
        })
            .then((res) => {
                dispatch({
                    type: actType.MANAGE_GET_POST,
                    payload: res.data,
                });
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
