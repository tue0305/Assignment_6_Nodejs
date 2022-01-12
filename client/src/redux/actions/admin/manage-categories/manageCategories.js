import axios from "axios";
import * as actType from "../../../constants/constans";

export const manageGetCategoriesAPI = () => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: "http://localhost:8002/category",
    }).then((res) => {
      console.log(res.data, "data");
      dispatch({
        type: actType.MANAGE_GET_CATEGORIES,
        payload: res.data,
      });
    });
  };
};

export const manageCreateCategoriesAPI = (category, cb) => {
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  Object.keys(category).forEach((key) => {
    formData.append(key, category[key]);
  });
  return function (dispatch) {
    axios({
      method: "POST",
      url: "http://localhost:8002/category/create",
      data: formData,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        dispatch({
          type: actType.MANAGE_CREATE_CATEGORIES,
          payload: res.data,
        });
        cb && cb(null, res.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};

export const manageDeleteCategoriesAPI = (categoryId, cb) => {
  const token = localStorage.getItem("accessToken");

  return function (dispatch) {
    axios({
      method: "DELETE",
      url: `http://localhost:8002/category/delete/${categoryId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        dispatch({
          type: actType.MANAGE_DELETE_CATEGORIES,
          payload: res.data,
        });
        cb && cb(null, res.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};
