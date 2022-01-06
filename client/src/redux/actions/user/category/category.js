import * as actionType from "../../../constants/constans";
import axios from "axios";
import Swal from "sweetalert2";

const getCategory = (categorys) => ({
  type: actionType.GET_CATEGORY,
  payload: categorys,
});

export const getCategoryAPI = () => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: "http://localhost:8002/category/",
    }).then((res) => {
      dispatch(getCategory(res.data));
    });
  };
};
// -----
const getCategoryPost = (categorys) => ({
  type: actionType.GET_CATEGORY_POST,
  payload: categorys,
});

export const getCategoryPostAPI = () => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: "http://localhost:8002/category",
    })
      .then((res) => {
        console.log(res.data, "data1");
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
const getPostUser = (categorys) => ({
  type: actionType.GET_USER_POST,
  payload: categorys,
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
        console.log(res.data, "data");
        dispatch(getPostUser(res.data));
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};

export const createPostUserAPI = (category) => {
  const token = localStorage.getItem("accessToken");
  return function (dispatch) {
    axios({
      method: "POST",
      url: `http://localhost:8002/post/user/create`,
      category,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        console.log(res.data, "ca");
        dispatch({
          type: actionType.ADD_USER_POST,
          payload: res.data,
        });
        dispatch(getPostUser(res.data));
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};

export const deletePostUserAPI = (postId) => {
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
        dispatch(getPostUser(res.data));
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};
