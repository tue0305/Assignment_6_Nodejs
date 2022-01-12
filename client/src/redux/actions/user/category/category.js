import * as actionType from "../../../constants/constans";
import axios from "axios";
import Swal from "sweetalert2";

const getCategory = (categorys) => ({
  type: actionType.GET_CATEGORY,
  payload: categorys,
});

export const getCategoryAPI = (cb) => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: "http://localhost:8002/category/",
    }).then((res) => {
      cb && cb(null, res.data);
      dispatch(getCategory(res.data));
    });
  };
};
// -----
const getCategoryPost = (categories) => ({
  type: actionType.GET_CATEGORY_POST,
  payload: categories,
});

export const getCategoryPostAPI = () => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: "http://localhost:8002/category",
    })
      .then((res) => {
        console.log(res.data, "d");
        dispatch(getCategoryPost(res.data));
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};

// -----
const detailCategory = (category) => ({
  type: actionType.GET_DETAIL_CATEGORY,
  payload: category,
});

export const getDetailCategoryAPI = (categoryId) => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: `http://localhost:8002/category/get-detail-category/${categoryId}`,
    }).then((res) => {
      dispatch(detailCategory(res.data));
    });
  };
};

// -----
const detailCategoryPost = (category) => ({
  type: actionType.GET_DETAIL_CATEGORY_POST,
  payload: category,
});

export const getDetailCategoryPostAPI = (postId) => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: `http://localhost:8002/post/${postId}`,
    })
      .then((res) => {
        dispatch(detailCategoryPost(res.data));
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};

// -----
const getPostUser = (getUserPost) => ({
  type: actionType.GET_USER_POST,
  payload: getUserPost,
});

export const getPostUserAPI = (userId) => {
  const token = localStorage.getItem("accessToken");
  return function (dispatch) {
    axios({
      method: "GET",
      url: `http://localhost:8002/post/user/${userId}`,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        dispatch(getPostUser(res.data));
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};

const createPostUser = (category) => ({
  type: actionType.ADD_USER_POST,
  payload: category,
});

export const createPostUserAPI = (category, cb) => {
  const token = localStorage.getItem("accessToken");
  return function (dispatch) {
    axios({
      method: "POST",
      url: `http://localhost:8002/post/user/create`,
      data: category,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        console.log(res.data, "ca");
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          width: "400px",
          padding: "0 0 20px 0",
        });
        dispatch(createPostUser(res.data));
        cb && cb(null, res.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};

export const deletePostUserAPI = (postId, cb) => {
  const token = localStorage.getItem("accessToken");
  return function (dispatch) {
    axios({
      method: "DELETE",
      url: `http://localhost:8002/post/user/delete/${postId}`,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Xóa thành công!",
          width: "400px",
          padding: "0 0 20px 0",
        });
        dispatch({
          type: actionType.DELETE_USER_POST,
          payload: res.data,
        });
        cb && cb(null, res.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};
