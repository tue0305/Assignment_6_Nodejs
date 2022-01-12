import axios from "axios";
import * as actType from "../../../constants/constans";
import Swal from "sweetalert2";

// export const getCommmentPostAPI = (postId, userId) => {
//   return function (dispatch) {
//     axios({
//       method: "GET",
//       url: `http://localhost:8003/${postId}/comment-post`,
//     })
//       .then((res) => {
//         let comments = res.data.data;
//         // console.log(res);

//         // console.log(comments);
//         // const userComments = [];
//         // comments.map((comment) => {
//         //   axios({
//         //     method: "GET",
//         //     url: `http://localhost:8001/detail-user/${comment.userId}`,
//         //   })
//         //     .then((rs) => {
//         //       userComments.push(rs.data);
//         //       console.log(userComments, "list");

//         //       console.log(rs.data, "list");
//         //     })
//         //     .catch((err) => {
//         //       console.log(err, "err");
//         //     });
//         // });

//         // console.log(userComments);
//         // =------
//         dispatch({
//           type: actType.GET_COMMENT_POST,
//           payload: res.data,
//         });
//       })
//       .catch((err) => {
//         console.log(err, "err");
//       });
//   };
// };

export const getCommmentPostAPI = (postId, userId) => {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:8003/${postId}/comment-post`);

    const comments = res.data.data;

    const userComment = [];

    comments.map(async (comment) => {
      const user = await axios.get(
        `http://localhost:8001/detail-user/${comment.userId}`
      );
      await userComment.push({ comment: comment, user: user.data });
    });
    dispatch({
      type: actType.GET_COMMENT_POST,
      payload: userComment,
    });
    // console.log(userComment);
  };
};

//           console.log(rs.data, "list");
//         })
//         .catch((err) => {
//           console.log(err, "err");
//         });
//     });

//     console.log(userComments);
//     // =------
//     dispatch({
//       type: actType.GET_COMMENT_POST,
//       payload: res.data,
//     });
//   })
//   .catch((err) => {
//     console.log(err, "err");
//   });
//};
//};

// export const getUserCommentAPI = (userId) => {
//   return function (dispatch) {
//     axios({
//       method: "GET",
//       url: `http://localhost:8001/detail-user/${userId}`,
//     })
//       .then((res) => {
//         dispatch({
//           type: actType.GET_USER_COMMENT_POST,
//           payload: res.data,
//         });
//       })
//       .catch((err) => {
//         console.log(err, "err");
//       });
//   };
// };

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

// ----- HIGHLIGHT
export const userCreateCommentHighlightAPI = (postId, newComment, cb) => {
  const token = localStorage.getItem("accessToken");
  return function (dispatch) {
    axios({
      method: "POST",
      url: `http://localhost:8003/${postId}/create-highlight-comment`,
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
          cb && cb(null, res.data);
          dispatch({
            type: actType.USER_CREATE_COMMENT_HIGHTLIGHT,
            payload: res.data,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Thất bại!",
            width: "400px",
            padding: "0 0 20px 0",
          });
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};

export const userGetCommentHighlightAPI = (postId) => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: `http://localhost:8003/${postId}/highlight-comment`,
    })
      .then((res) => {
        // console.log("res", res);
        dispatch({
          type: actType.USER_GET_COMMENT_HIGHTLIGHT,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};
