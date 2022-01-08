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
