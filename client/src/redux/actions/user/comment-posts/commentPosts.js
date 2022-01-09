import axios from "axios";
import * as actType from "../../../constants/constans";
import Swal from "sweetalert2";
export const getCommmentPostAPI = (postId) => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: `http://localhost:8003/${postId}/comment-post`,
    })
      .then((res) => {
        dispatch({
          type: actType.GET_COMMENT_POST,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};

export const getUserCommentAPI = (userId) => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: `http://localhost:8001/detail-user/${userId}`,
    })
      .then((res) => {
        dispatch({
          type: actType.GET_USER_COMMENT_POST,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};

export const userCreateCommentAPI = (postId, newComment) => {
  const token = localStorage.getItem("accessToken");
  return function (dispatch) {
    axios({
      method: "POST",
      url: `http://localhost:8003/${postId}/create-comment`,
      data: newComment,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        if (res.data.success === true) {
          Swal.fire({
            icon: "success",
            title: "Bình luận thành công!",
            width: "400px",
            padding: "0 0 20px 0",
          });
        }
        dispatch({
          type: actType.USER_CREATE_COMMENT_POST,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};
